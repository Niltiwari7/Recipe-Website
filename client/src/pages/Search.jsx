import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/Listingitem";
const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    veg: false,
    non_veg: false,
    other: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore,setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const vegFromUrl = urlParams.get("veg");
    const non_vegFromUrl = urlParams.get("non_veg");
    const otherFromUrl = urlParams.get("other");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      vegFromUrl ||
      non_vegFromUrl ||
      otherFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        veg: vegFromUrl === "true" ? true : false,
        non_veg: non_veg === "true" ? true : false,
        other: otherFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();

      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if(data.length>8){
        setShowMore(true);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "veg" ||
      e.target.id === "non_veg" ||
      e.target.id === "other"
    ) {
      setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("veg", sidebardata.veg);
    urlParams.set("non_veg", sidebardata.non_veg);
    urlParams.set("other", sidebardata.other);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Search</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="veg"
                className="w-5"
                checked={sidebardata.veg}
                onChange={handleChange}
              />
              <span className="font-semibold">Veg</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="non_veg"
                className="w-5"
                checked={sidebardata.non_veg}
                onChange={handleChange}
              />
              <span className="font-semibold">Non Veg</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="other"
                className="w-5"
                checked={sidebardata.other}
                onChange={handleChange}
              />
              <span className="font-semibold">Other</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-red-600 p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Result:
        </h1>
        <div className="p-7 flex flex-wrap ">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing Found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
           {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

            {
              showMore && (
                <button
                onClick={onShowMoreClick}
                className="text-green-700 hover:opacity-60 uppercase text-center w-full"
                >Show more</button>
              )
            }
        </div>
      </div>
    </div>
  );
};

export default Search;
