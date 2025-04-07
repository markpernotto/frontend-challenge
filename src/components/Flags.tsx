import {
  FlagsProps,
  SlimCountry,
} from "../utilities/interface";

export default function Flags({
  flags,
}: FlagsProps) {
  return (
    <div>
      <h1>Flags</h1>
      <div>
        {flags?.map((d: SlimCountry) => (
          <div key={d.name}>
            <h3>{d.name}</h3>
            <img
              src={d.href.flag}
              alt={`${d.name} flag`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
