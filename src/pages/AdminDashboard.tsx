import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FolderKanban } from "lucide-react";
import { AdminChat } from "@/components/admin/AdminChat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: profiles } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_superadmin', false)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: projects } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, profiles(email)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8">Admin Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Users</p>
                <p className="text-lg sm:text-2xl font-bold">{profiles?.length || 0}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 sm:p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                <FolderKanban className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Projects</p>
                <p className="text-lg sm:text-2xl font-bold">{projects?.length || 0}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="mb-4 sm:mb-6 lg:mb-8 overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Users</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Email</TableHead>
                    <TableHead className="whitespace-nowrap">Created At</TableHead>
                    <TableHead className="whitespace-nowrap">Projects</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profiles?.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="max-w-[200px] truncate">{profile.email}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {projects?.filter(p => p.user_id === profile.id).length || 0}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>

        {/* Projects Table */}
        <Card className="overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Projects</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Type</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Owner</TableHead>
                    <TableHead className="whitespace-nowrap">Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects?.map((project) => (
                    <TableRow 
                      key={project.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleProjectClick(project.id)}
                    >
                      <TableCell className="font-medium text-blue-600 hover:text-blue-800 max-w-[200px] truncate">
                        {project.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{project.project_type}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                          project.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : project.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{project.profiles?.email}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {new Date(project.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;