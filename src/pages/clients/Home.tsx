import { useAppContext } from "@/components/context/app.context";

export default function Home() {
  const { user } = useAppContext();

  return (
    <div>
      <h1>{user?.fullName ?? "You may want to login!"}</h1>
    </div>
  );
}
