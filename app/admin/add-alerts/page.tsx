"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/utils/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Alert = {
  id: number;
  userid: string;
  message: string;
  title: string;
  created_at: string;
};

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ userid: string } | null>(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchAlerts();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (user) {
        setCurrentUser({
          userid: user.id,
        });
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      setError("Failed to fetch current user.");
    }
  };

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .order("id", { ascending: true });
      if (error) throw error;
      setAlerts(data as Alert[]);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setError("Failed to fetch alerts.");
    } finally {
      setLoading(false);
    }
  };

  const addAlert = async () => {
    if (!title.trim() || !message.trim()) {
      setError("Title and message cannot be empty.");
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("alerts")
        .insert([
          {
            title,
            message,
            userid: currentUser?.userid || "admin",
            created_at: new Date().toISOString(),
          },
        ]);
      if (error) throw error;
      setTitle("");
      setMessage("");
      fetchAlerts();
    } catch (error) {
      console.error("Error adding alert:", error);
      setError("Failed to add alert.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlert = async (id: number) => {
    try {
      const { error } = await supabase
        .from("alerts")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    } catch (error) {
      console.error("Error deleting alert:", error);
      setError("Failed to delete alert.");
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>A list of all alerts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            <Input
              type="text"
              placeholder="Enter alert title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1"
            />
            <Input
              type="text"
              placeholder="Enter alert message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addAlert} disabled={loading}>Add Alert</Button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableCaption>A list of all alerts.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="w-[200px]">User ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="max-w-[300px]">Message</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.id}</TableCell>
                    <TableCell className="truncate">{alert.userid}</TableCell>
                    <TableCell className="truncate max-w-[200px]">{alert.title}</TableCell>
                    {/* <TableCell>{alert.message}</TableCell> */}
                    <TableCell className="max-w-[300px] line-clamp-3" style={{ maxHeight: '80px' }}>
                      {alert.message}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteAlert(alert.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;