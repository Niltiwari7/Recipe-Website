import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/Listingitem';

export default function Home() {
  const [vegListing, setVegListings] = useState([]);
  const [nonVegListings, setNonVegListings] = useState([]);
  const [otherListings, setOtherListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchVegListings = async () => {
      try {
        const res = await fetch('/api/listing/get?veg=true&limit=5');
        const data = await res.json();
        setVegListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNonVegListings = async () => {
      try {
        const res = await fetch('/api/listing/get?non_veg=true&limit=4');
        const data = await res.json();
        setNonVegListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOtherListings = async () => {
      try {
        const res = await fetch('/api/listing/get?other=true&limit=4');
        const data = await res.json();
        setOtherListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVegListings();
    fetchNonVegListings();
    fetchOtherListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-[#333333] font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          Recipes with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Recipe Adda is the best place to find your next perfect recipe to eat.
          <br />
          We have a wide range of recipes for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {vegListing &&
          vegListing.length > 0 &&
          vegListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {vegListing && vegListing.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Recipes</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?veg=true'}>
                Show more Recipes
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {vegListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {nonVegListings && nonVegListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Non-veg Recipes</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?non_veg=true'}>
                Show more Non-veg Recipes
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {nonVegListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {otherListings && otherListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Other Recipes</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?other=true'}>
                Show more other Recipes
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {otherListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
