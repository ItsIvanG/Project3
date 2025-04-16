"use client";

import { Fragment, useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin-sidebar";
import { useUserStore } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import UserBadge from "@/custom/UserBadge";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import UploadAvatar from "@/app/upload/UploadAvatar";

export default function Page() {
  const name = useUserStore((state) => state.name);
  const role = useUserStore((state) => state.role);
  const accountId = useUserStore((state) => state.accountId); // ✅ correctly grabbing the value

  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    account_id: 0,
    email: "",
    password: "",
    confirmPassword: "", // ← added
    fname: "",
    lname: "",
    role: role,
    profile_picture: "",
  });

  useEffect(() => {
    const [fname, lname] = name.split(" ");
    setFormData((prev) => ({
      ...prev,
      account_id: parseInt(accountId), // ✅ make sure it's a number
      fname: fname || "",
      lname: lname || "",
      role: role,
    }));
  }, [accountId, name, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (role !== "admin" && role !== "") {
      console.log("Redirecting to home page, role = ", role);
      router.push("/");
    }
  }, [role]);
  const setName = useUserStore((state) => state.setName); // add this line at the top of the component
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      ...formData,
      account_id: parseInt(accountId),
    };

    try {
      const res = await fetch(
        "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/edit_user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.status === "success") {
        setName(`${formData.fname} ${formData.lname}`);
        alert("User updated successfully!");
      } else {
        alert("Update failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update user.");
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
              <UserBadge name={name} pic="hahah" role={role} />
            </div>

            <div id="courses">
              <div className="flex justify-between items-center mt-5">
                <h1 className="text-3xl">Settings</h1>
              </div>
              <div>
                <Card className="mt-5">
                  <CardContent className="space-y-4 p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label>Email</Label>
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label>Password</Label>
                        <Input
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label>Confirm Password</Label>
                        <Input
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label>First Name</Label>
                        <Input
                          name="fname"
                          value={formData.fname}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input
                          name="lname"
                          value={formData.lname}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label>Profile Picture</Label>
                        <UploadAvatar />
                      </div>
                      <Button type="submit" className="end-0">
                        <Save className="mr-2" />
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </Fragment>
  );
}
