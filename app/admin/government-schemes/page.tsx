"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/utils/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Trash } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

const schemeSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  overview: z.string().min(20, "Overview must be at least 20 characters"),
  benefits: z.string().min(20, "Benefits must be at least 20 characters"),
  eligibility: z.string().min(20, "Eligibility criteria must be at least 20 characters"),
  requiredoc: z.string().min(20, "Required documents must be at least 20 characters"),
  imagelink: z.string().optional(),
  applylink: z.string().url("Must be a valid URL"),
})

type SchemeFormValues = z.infer<typeof schemeSchema>

export default function GovernmentSchemesPage() {
  const [schemes, setSchemes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const form = useForm<SchemeFormValues>({
    resolver: zodResolver(schemeSchema),
    defaultValues: {
      title: "",
      overview: "",
      benefits: "",
      eligibility: "",
      requiredoc: "",
      imagelink: "",
      applylink: "",
    },
  })

  useEffect(() => {
    fetchSchemes()
  }, [])

  async function fetchSchemes() {
    try {
      setError(null)
      setLoading(true)

      const { data, error } = await supabase
        .from('scheme')
        .select('*')
        .order('id', { ascending: true })

      if (error) throw error

      setSchemes(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching schemes:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
  try {
    setUploadingImage(true);

    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    // Generate unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `schemes/${fileName}`;

    console.log("Uploading to Supabase Storage:", {
      bucket: "images",
      path: filePath,
      fileType: file.type,
      fileSize: file.size
    });

    // Upload to Supabase
    const { data, error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload failed:", uploadError);
      throw new Error(uploadError.message);
    }

    console.log("Upload successful:", data);

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    console.log("Public URL generated:", publicUrl);

    // Set image link in form
    form.setValue("imagelink", publicUrl);

    toast.success("Image uploaded successfully");
  } catch (err) {
    console.error("Upload error:", err);
    toast.error(err instanceof Error ? err.message : "Failed to upload image");
  } finally {
    setUploadingImage(false);
  }
}


  async function onSubmit(data: SchemeFormValues) {
    try {
      const { error } = await supabase
        .from('scheme')
        .insert([data])

      if (error) throw error

      toast.success("Scheme added successfully")
      setIsDialogOpen(false)
      form.reset()
      fetchSchemes()
    } catch (err) {
      toast.error("Failed to add scheme")
      console.error('Error adding scheme:', err)
    }
  }

  async function handleDeleteScheme(schemeId: number) {
    try {
      const { error } = await supabase
        .from('scheme')
        .delete()
        .eq('id', schemeId)

      if (error) throw error

      toast.success("Scheme deleted successfully")
      fetchSchemes()
    } catch (err) {
      toast.error("Failed to delete scheme")
      console.error('Error deleting scheme:', err)
    }
  }

  return (
    <main>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex justify-between items-center px-4 lg:px-6">
              <h1 className="text-2xl font-bold">Government Schemes</h1>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add New Scheme</Button>
                </DialogTrigger>
                <DialogContent className="min-w-7xl max-h-full overflow-y-auto my-2">
                  <DialogHeader>
                    <DialogTitle>Add New Government Scheme</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new government scheme.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Scheme Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter scheme title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="overview"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Overview</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter scheme overview"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="benefits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Benefits</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter scheme benefits"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="eligibility"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Eligibility Criteria</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter eligibility criteria"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="requiredoc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Required Documents</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter required documents"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormItem>
                        <FormLabel>Scheme Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                          />
                        </FormControl>
                        {uploadingImage && (
                          <p className="text-sm text-muted-foreground">Uploading image...</p>
                        )}
                      </FormItem>
                      <FormField
                        control={form.control}
                        name="applylink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Application Link</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter application link" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Add Scheme</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            {loading ? (
              <p className="text-center text-gray-500">Loading schemes...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-6">
                {schemes.map((scheme) => (
                  <Dialog key={scheme.id}>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                          <div className="aspect-video relative">
                            <img
                              src={scheme.imagelink}
                              alt={scheme.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                              {scheme.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                              {scheme.overview}
                            </p>
                            <div className="flex justify-between items-center">
                              <Badge variant="outline">Scheme ID: {scheme.id}</Badge>
                              <Button variant="ghost" size="sm" className="gap-2">
                                View Details
                                <ExternalLink className="size-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="min-w-7xl max-h-full overflow-y-auto my-2">
                      <DialogHeader>
                        <DialogTitle>{scheme.title}</DialogTitle>
                        <DialogDescription>
                          Detailed information about the scheme
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">Overview</h4>
                          <p className="text-sm text-muted-foreground">{scheme.overview}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Benefits</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{scheme.benefits}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Eligibility Criteria</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{scheme.eligibility}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Required Documents</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{scheme.requiredoc}</p>
                        </div>
                        <div className="pt-4 flex gap-2">
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => handleDeleteScheme(scheme.id)}
                          >
                            Delete Scheme
                            <Trash className="ml-2 size-4" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 