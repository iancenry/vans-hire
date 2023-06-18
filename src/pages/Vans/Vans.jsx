import { useSearchParams, useLoaderData, defer, Await } from "react-router-dom";
import { getVans } from "../../api";
import Van from "./Van";
import { Suspense } from "react";

export function vansLoader() {
  return defer({ vans: getVans() });
}

const Vans = () => {
  const vansLoaderPromise = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  function renderVanElements(vans) {
    // if there is a type filter, vans that match condition are added to var else add all vans
    const displayedVans = typeFilter
      ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
      : vans;

    let vansArray = displayedVans?.map((van) => (
      <Van
        key={van.id}
        id={van.id}
        name={van.name}
        price={van.price}
        image={van.imageUrl}
        type={van.type}
        searchParams={searchParams}
      />
    ));

    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            onClick={() => setSearchParams({ type: "luxury" })}
            className={`van-type luxury ${
              typeFilter === "luxury" && "selected"
            }`}
          >
            Luxury
          </button>
          <button
            onClick={() => setSearchParams({ type: "simple" })}
            className={`van-type simple ${
              typeFilter === "simple" && "selected"
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => setSearchParams({ type: "rugged" })}
            className={`van-type rugged ${
              typeFilter === "rugged" && "selected"
            }`}
          >
            Rugged
          </button>
          {typeFilter && (
            <button
              onClick={() => setSearchParams({})}
              className="van-type clear-filters"
            >
              Clear
            </button>
          )}
        </div>
        <div className="vans">{vansArray}</div>
      </>
    );
  }

  return (
    <div>
      <h1 className="van-header">Explore our van options</h1>
      <Suspense
        fallback={
          <div className="loader">
            <img src={`/src/assets/images/clouds-spinner.gif`} alt="loader" />
          </div>
        }
      >
        <Await resolve={vansLoaderPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
};

export default Vans;
