type TabBarProps = {
    tabs: string[]
    value: string
    onChange: (label: string) => void
  }
  export default function TabBar({ tabs, value, onChange }: TabBarProps) {
    return (
      <div className="subtabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={`subtab ${t === value ? 'subtab-active' : ''}`}
            onClick={() => onChange(t)}
          >
            {t}
          </button>
        ))}
      </div>
    )
  }
  