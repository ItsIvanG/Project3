import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/custom/dark_toggle";
import { Fragment } from "react";

export default function About() {
  return (
    <Fragment>
      <div>About</div>
      <Button>Click me</Button>
      <ModeToggle />
    </Fragment>
  );
}
