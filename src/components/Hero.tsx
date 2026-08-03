export default function Hero() {
  return (
    <section className="min-h-screen bg-[#09090B] text-white flex flex-col justify-center items-center px-6">

      <h1 className="text-6xl md:text-8xl font-bold text-center">
        War Cost Tracker
      </h1>

      <p className="mt-6 text-xl text-gray-300 text-center max-w-3xl">
        Real-time estimation of the financial cost of Russia's war against Ukraine.
      </p>

      <div className="mt-14 text-center">

        <p className="text-gray-400 uppercase tracking-[4px]">
          Estimated Cost
        </p>

        <h2 className="text-6xl md:text-8xl font-extrabold text-red-500 mt-2">
          $0
        </h2>

      </div>

    </section>
  );
}