const stats = [
  { value: '+60', label: 'Anos de atuação' },
  { value: '+1500', label: 'Empresas associadas' },
  { value: 'Sistema', label: 'CDL Nacional' },
];

export function Stats() {
  return (
    <section className="bg-cdl-gray border-y border-gray-200/80">
      <div className="container-cdl py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((item, i) => (
            <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="text-3xl sm:text-4xl font-bold text-cdl-blue">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-cdl-gray-text">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
