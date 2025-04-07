import {
  FlagsProps,
  FullCountry,
} from "../utilities/interface";
import Flag from "./Flag";
import styles from "./components.module.css";

export default function Flags({
  flags,
}: FlagsProps) {
  return (
    <>
      <div className={styles.flags_container}>
        {flags?.map((country: FullCountry) => (
          <Flag
            country={country}
            key={country.name}
          />
        ))}
      </div>
    </>
  );
}
