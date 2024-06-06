import { Button } from "flowbite-react";
import Link from "next/link";
import { GiBiceps } from "react-icons/gi";
import { ImBook } from "react-icons/im";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center p-52 -translate-y-16">
      <div className="z-10 w-full max-w-5xl justify-center text-center text-sm flex flex-col">
        <p className="text-start text-5xl font-bold font-mono">
          Flex Up With FlexTime!
        </p>
        <div className="flex">
          <Link className="w-52 mt-5 text-start font-sans" href="/fitnessplans">
            <Button gradientDuoTone="pinkToOrange" outline size={'xl'} className="flex items-center">
              <span className="mr-2">Fitness Plans</span>
              <span className="self-center">
                <GiBiceps size={24}/>
              </span>
            </Button>
          </Link>
          <Link className="w-52 mt-5 text-start font-sans" href="/courseplan">
            <Button gradientDuoTone="pinkToOrange" outline size={'xl'} className="flex items-center">
              <span className="mr-2">Course Plan</span>
              <span className="self-center">
                <ImBook size={20}/>
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
