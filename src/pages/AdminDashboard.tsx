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
      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 xl:px-8 py-3 md:py-4 lg:py-6 xl:py-8">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 lg:mb-6 xl:mb-8">Admin Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 mb-3 md:mb-4 lg:mb-6 xl:mb-8">
          <Card className="p-3 md:p-4 lg:p-6">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="p-2 md:p-3 bg-blue-100 rounded-full">
                <Users className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500">Total Users</p>
                <p className="text-base md:text-lg lg:text-2xl font-bold">{profiles?.length || 0}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-3 md:p-4 lg:p-6">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="p-2 md:p-3 bg-purple-100 rounded-full">
                <FolderKanban className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500">Total Projects</p>
                <p className="text-base md:text-lg lg:text-2xl font-bold">{projects?.length || 0}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="mb-3 md:mb-4 lg:mb-6 xl:mb-8 overflow-hidden">
          <div className="p-3 md:p-4 lg:p-6 xl:p-8">
            <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4">Users</h2>
            <div className="overflow-x-auto -mx-3 md:-mx-4 lg:-mx-6 xl:-mx-8">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap py-3 pl-3 md:pl-4 lg:pl-6 xl:pl-8">Email</TableHead>
                        <TableHead className="whitespace-nowrap py-3 px-2 md:px-3">Created At</TableHead>
                        <TableHead className="whitespace-nowrap py-3 px-2 md:px-3">Projects</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles?.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell className="max-w-[150px] md:max-w-[200px] truncate py-3 pl-3 md:pl-4 lg:pl-6 xl:pl-8">
                            {profile.email}
                          </TableCell>
                          <TableCell className="whitespace-nowrap py-3 px-2 md:px-3">
                            {new Date(profile.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="py-3 px-2 md:px-3">
                            {projects?.filter(p => p.user_id === profile.id).length || 0}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Projects Table */}
        <Card className="overflow-hidden">
          <div className="p-3 md:p-4 lg:p-6 xl:p-8">
            <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4">Projects</h2>
            <div className="overflow-x-auto -mx-3 md:-mx-4 lg:-mx-6 xl:-mx-8">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap py-3 pl-3 md:pl-4 lg:pl-6 xl:pl-8">Name</TableHead>
                        <TableHead className="whitespace-nowrap py-3 px-2 md:px-3">Type</TableHead>
                        <TableHead className="whitespace-nowrap py-3 px-2 md:px-3">Status</TableHead>
                        <TableHead className="whitespace-nowrap py-3 px-2 md:px-3">Owner</TableHead>
                        <TableHead className="whitespace-nowrap py-3 px-2 md:px-3">Created At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects?.map((project) => (
                        <TableRow 
                          key={project.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleProjectClick(project.id)}
                        >
                          <TableCell className="font-medium text-blue-600 hover:text-blue-800 max-w-[150px] md:max-w-[200px] truncate py-3 pl-3 md:pl-4 lg:pl-6 xl:pl-8">
                            {project.name}
                          </TableCell>
                          <TableCell className="whitespace-nowrap py-3 px-2 md:px-3">{project.project_type}</TableCell>
                          <TableCell className="whitespace-nowrap py-3 px-2 md:px-3">
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
                          <TableCell className="max-w-[150px] md:max-w-[200px] truncate py-3 px-2 md:px-3">
                            {project.profiles?.email}
                          </TableCell>
                          <TableCell className="whitespace-nowrap py-3 px-2 md:px-3">
                            {new Date(project.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;