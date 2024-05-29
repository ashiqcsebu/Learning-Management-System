"use client";
import { FC } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";

interface Props {}
const Page: FC<Props> = (props) => {
  return (
    <div>
      <Heading
        title="E-Learning"
        description="Online Learning"
        keywords="MERN Redux"
      />
      <Header></Header>
    </div>
  );
};

export default Page;
