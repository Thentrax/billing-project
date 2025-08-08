import InfoCard from "@/components/InfoCard";
import { Navbar } from "@/components/Navbar";
import TransitionForm from "@/components/TransitionForm";
import TransitionList from "@/components/TransitionList";
import { TransitionProvider } from "@/context/TransitionContext/provider";

export default function Home() {
  return (
    <div className="bg-foreground w-full h-full px-4 md:px-16 py-6 overflow-y-auto">
      <TransitionProvider>
        <div className="flex flex-col md:flex-row w-full h-full gap-6">
          
          <div className="w-full md:w-1/5">
            <Navbar />
          </div>

          <div className="w-full flex flex-col gap-6">
            <InfoCard />
            <TransitionForm />
          </div>

          <div className="w-full md:w-1/5">
            <TransitionList />
          </div>
          
        </div>
      </TransitionProvider>
    </div>
  );
}
