"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/utils/client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

export default function Page() {
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setError(null);
      setLoading(true);

      const { data, error } = await supabase.from("user").select("*");

      if (error) {
        setError(error.message);
      } else {
        setUserData(data);
      }

      setLoading(false);
    }

    fetchUsers();
  }, []);

  return (
    <main>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : (
              <DataTable data={userData} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
