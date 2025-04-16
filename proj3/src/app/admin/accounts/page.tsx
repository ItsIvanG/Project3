"use client";

import { Fragment, useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin-sidebar";
import { useUserStore } from "@/store";
import UserBadge from "@/custom/UserBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Accounts() {
  const name = useUserStore((state) => state.name);
  const role = useUserStore((state) => state.role);
  const roleId = useUserStore((state) => state.roleId);

  const [instructors, setInstructors] = useState([]);
  const [newInstructor, setNewInstructor] = useState({
    email: "",
    password: "",
    instructor_fname: "",
    instructor_lname: "",
    created_by_admin: 1,
  });

  useEffect(() => {
    fetch(
      "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/instructor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "get_all_instructors" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const parsed = JSON.parse(data.body);
        setInstructors(parsed.instructors);
      });
  }, []);
  const handleAddInstructor = async () => {
    const {
      email,
      password,
      instructor_fname,
      instructor_lname,
      created_by_admin,
    } = newInstructor;

    try {
      const response = await fetch(
        "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/instructor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            instructor_fname,
            instructor_lname,
            created_by_admin,
          }),
        }
      );

      const data = await response.json();
      console.log("Instructor added:", data);

      // Optionally refresh the instructor list
      setInstructors((prev) => [
        ...prev,
        {
          email,
          password,
          instructor_fname,
          instructor_lname,
          account_id: Date.now(), // temporary local ID
        },
      ]);

      // Clear form
      setNewInstructor({
        email: "",
        password: "",
        instructor_fname: "",
        instructor_lname: "",
        created_by_admin: roleId,
      });
    } catch (err) {
      console.error("Error adding instructor:", err);
    }
  };

  return (
    <Fragment>
      <div className="md:m-10 m-5">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex w-full flex-col">
            <div className="flex justify-between items-center">
              <SidebarTrigger />
              <UserBadge name={name} pic="admin-profile-pic" role={role} />
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Instructor Accounts</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Instructor</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Instructor</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Email"
                        value={newInstructor.email}
                        onChange={(e) =>
                          setNewInstructor({
                            ...newInstructor,
                            email: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Password"
                        type="password"
                        value={newInstructor.password}
                        onChange={(e) =>
                          setNewInstructor({
                            ...newInstructor,
                            password: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="First Name"
                        value={newInstructor.instructor_fname}
                        onChange={(e) =>
                          setNewInstructor({
                            ...newInstructor,
                            instructor_fname: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Last Name"
                        value={newInstructor.instructor_lname}
                        onChange={(e) =>
                          setNewInstructor({
                            ...newInstructor,
                            instructor_lname: e.target.value,
                          })
                        }
                      />
                      <Button onClick={handleAddInstructor}>Submit</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instructors.map((inst) => (
                    <TableRow key={inst.account_id} className="group">
                      <TableCell>{inst.instructor_fname}</TableCell>
                      <TableCell>{inst.instructor_lname}</TableCell>
                      <TableCell>{inst.email}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </Fragment>
  );
}
