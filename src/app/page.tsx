import { Button } from "@nextui-org/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GiBiceps } from "react-icons/gi";
import { ImBook } from "react-icons/im";

export default function Home() {
  const token = cookies().get("userToken")?.value;
  if (!token) {
    redirect("/auth/register");
  }
  return (
    <main className="flex -translate-y-20 h-screen flex-col justify-center mx-10 p-6">
      <div className="z-10 w-full max-w-5xl text-center text-sm flex flex-col">
        <p className="text-start text-5xl font-bold font-custom">
          Flex Up With FlexTime!
        </p>
        <div className="flex mt-5 mb-3 gap-4">
          <Link className="max-w-52 text-start font-sans" href="/fitness-plan">
            <Button size="lg" variant="ghost" color="primary" className="flex items-center text-white">
              <span className="hidden sm:block mr-2">Fitness Plans</span>
              <span className="self-center">
                <GiBiceps size={24} color="white"/>
              </span>
            </Button>
          </Link>
          <Link className="max-w-52 text-start font-sans" href="/course-plan">
            <Button size="lg" variant="ghost" color="primary" className="flex items-center text-white">
              <span className="mr-2 hidden sm:block">Course Plan</span>
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
