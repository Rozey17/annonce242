import { useState } from "react";
import { useRouter } from "next/router";
import { SearchCircleIcon } from "@heroicons/react/solid";

export default function Search() {
  const [term, setTerm] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/offres/search?term=${term}`);
    setTerm("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center ">
          <input
            className="search"
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Recherche..."
          />
        </div>
      </form>
    </div>
  );
}
