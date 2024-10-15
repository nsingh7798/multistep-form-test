import { Await, defer, json, useLoaderData } from "@remix-run/react";
import { Skeleton } from "../components/ui/skeleton"
import StepForm from "../components/StepForm"
import { Suspense } from "react";
import countriedData from "../lib/countriesData"

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

async function getCountries() {
  const countries = countriedData.map(country => ({
    name: country.name,
    code: country.isoCode,
  }));

  return countries;
}

export const loader = async ({ request }) => {
  const countriesPromise = getCountries();

  return defer({
    countries: countriesPromise,
  });
};

export default function Index() {
  const { countries } = useLoaderData();

  return (
    <Suspense fallback={SkeletonCard()}>
      <Await resolve={countries}>
        {(resolvedCountries) => <StepForm countries={resolvedCountries} />}
      </Await>
    </Suspense>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 items-center">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}