// Auth.js
import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Auth() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [type, setType] = useState("signin");

  const handleSignUpSuccess = () => {
    setType("signin");
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        className="bg-amber-500 lg:ml-auto hover:bg-amber-600 text-white py-2 px-4 rounded-full shadow-lg transition-colors duration-300 ease-in-out"
      >
        Sign In
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="w-full max-w-[24rem]">
          <CardHeader
            color="amber"
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
          >
            <div className="gap-2 mr-4 ml-2">
              <Typography
                as="a"
                href="#"
                className="cursor-pointer  font-semibold text-xl uppercase text-gray-700  tracking-wider"
              >
                Simplexity
              </Typography>
              <Typography
                as="a"
                href="#"
                className="cursor-pointer   text-xs uppercase text-gray-700 tracking-widest"
              >
                outdoor wears
              </Typography>
            </div>
          </CardHeader>
          <CardBody>
            <Tabs value={type} className="overflow-visible">
              <TabsHeader className="relative z-0">
                <Tab value="signin" onClick={() => setType("signin")}>
                  Sign In
                </Tab>
                <Tab value="signup" onClick={() => setType("signup")}>
                  Sign Up
                </Tab>
              </TabsHeader>
              <TabsBody
                className="!overflow-x-hidden !overflow-y-visible"
                animate={{
                  initial: {
                    x: type === "signup" ? 400 : -400,
                  },
                  mount: {
                    x: 0,
                  },
                  unmount: {
                    x: type === "signup" ? 400 : -400,
                  },
                }}
              >
                <TabPanel value="signup" className="p-0">
                  <SignUp onSuccess={handleSignUpSuccess} />
                </TabPanel>
                <TabPanel value="signin" className="p-0">
                  <SignIn />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}
