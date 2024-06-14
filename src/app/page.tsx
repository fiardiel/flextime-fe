import { Button } from "@nextui-org/button";
import Link from "next/link";
import { GiBiceps } from "react-icons/gi";
import { ImBook } from "react-icons/im";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center p-52 -translate-y-16">
      <div className="z-10 w-full max-w-5xl justify-center text-center text-sm flex flex-col">
        <p className="text-start text-5xl font-bold font-custom">
          Flex Up With FlexTime!
        </p>
        <div className="flex">
          <Link className="w-52 mt-5 text-start font-sans" href="/fitness-plan">
            <Button size="lg" variant="ghost" color="secondary" className="flex items-center text-white">
              <span className="mr-2">Fitness Plans</span>
              <span className="self-center">
                <GiBiceps size={24} color="white"/>
              </span>
            </Button>
          </Link>
          <Link className="w-52 mt-5 text-start font-sans" href="/course-plan">
            <Button size="lg" variant="ghost" color="secondary" className="flex items-center text-white">
              <span className="mr-2">Course Plan</span>
              <span className="self-center">
                <ImBook size={20} color="white"/>
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
