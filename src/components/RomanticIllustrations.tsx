import React from 'react';

interface SvgProps {
  className?: string;
  size?: number;
}

/**
 * Custom hand-crafted strawberry illustration (not a generic emoji).
 * Used for the signature cursor, decorative accents, and the hidden strawberry.
 */
export const StrawberryGraphic: React.FC<SvgProps & { withBlossom?: boolean }> = ({
  className = '',
  size = 36,
  withBlossom = false,
}) => {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`berry-grad-${id}`} x1="18" y1="16" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E15467" />
          <stop offset="55%" stopColor="#C83E50" />
          <stop offset="100%" stopColor="#942437" />
        </linearGradient>
        <linearGradient id={`leaf-grad-${id}`} x1="20" y1="6" x2="44" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#85A67D" />
          <stop offset="100%" stopColor="#4F724B" />
        </linearGradient>
      </defs>

      {/* Delicate curved stem */}
      <path
        d="M32 6C32.5 9.5 31.8 12.5 31.5 15"
        stroke="#4F724B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Berry body */}
      <path
        d="M32 16.5C21.5 16.5 14 23.2 15.2 33.4C16.4 43.8 25.5 55.2 32 56.5C38.5 55.2 47.6 43.8 48.8 33.4C50 23.2 42.5 16.5 32 16.5Z"
        fill={`url(#berry-grad-${id})`}
        stroke="#783D50"
        strokeWidth="1.2"
      />

      {/* Subtle soft highlight */}
      <path
        d="M22.2 24.5C20.2 27.6 19.6 32.1 20.6 36.2"
        stroke="#F7B3BE"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Golden-ivory strawberry seeds */}
      <g fill="#FCE8C3" opacity="0.92">
        <ellipse cx="26" cy="25" rx="1.1" ry="1.6" transform="rotate(-10 26 25)" />
        <ellipse cx="33" cy="24" rx="1.1" ry="1.6" />
        <ellipse cx="39" cy="26" rx="1.1" ry="1.6" transform="rotate(10 39 26)" />
        <ellipse cx="22.5" cy="32" rx="1.1" ry="1.6" transform="rotate(-12 22.5 32)" />
        <ellipse cx="29.5" cy="31.5" rx="1.1" ry="1.6" />
        <ellipse cx="36.5" cy="32" rx="1.1" ry="1.6" />
        <ellipse cx="42.5" cy="33" rx="1.1" ry="1.6" transform="rotate(12 42.5 33)" />
        <ellipse cx="25.5" cy="39.5" rx="1.1" ry="1.6" transform="rotate(-8 25.5 39.5)" />
        <ellipse cx="32.5" cy="39" rx="1.1" ry="1.6" />
        <ellipse cx="38.5" cy="40" rx="1.1" ry="1.6" transform="rotate(8 38.5 40)" />
        <ellipse cx="29" cy="46.5" rx="1" ry="1.5" />
        <ellipse cx="35" cy="46.5" rx="1" ry="1.5" />
        <ellipse cx="32" cy="51.2" rx="0.9" ry="1.3" />
      </g>

      {/* Leafy calyx crown */}
      <path
        d="M32 14.5C28.5 11.5 21 12.2 17.5 16.2C22.2 16.5 25.8 18 28.5 19.6C25 20.4 21.5 21.8 19.5 23.2C24.2 22.8 28.2 21.2 31.8 19.2C35.4 21.2 39.4 22.8 44.1 23.2C42.1 21.8 38.6 20.4 35.1 19.6C37.8 18 41.4 16.5 46.1 16.2C42.6 12.2 35.1 11.5 32 14.5Z"
        fill={`url(#leaf-grad-${id})`}
        stroke="#3E5C3B"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M32 14.2C30.2 16.8 29.8 19.4 32 21.8C34.2 19.4 33.8 16.8 32 14.2Z"
        fill="#92B389"
        stroke="#3E5C3B"
        strokeWidth="0.9"
      />

      {/* Optional tiny white strawberry flower accent */}
      {withBlossom && (
        <g transform="translate(43 10)">
          <circle cx="0" cy="-3.5" r="2.6" fill="#FFF9F5" stroke="#D9B7AC" strokeWidth="0.7" />
          <circle cx="3.3" cy="-1" r="2.6" fill="#FFF9F5" stroke="#D9B7AC" strokeWidth="0.7" />
          <circle cx="2" cy="2.8" r="2.6" fill="#FFF9F5" stroke="#D9B7AC" strokeWidth="0.7" />
          <circle cx="-2" cy="2.8" r="2.6" fill="#FFF9F5" stroke="#D9B7AC" strokeWidth="0.7" />
          <circle cx="-3.3" cy="-1" r="2.6" fill="#FFF9F5" stroke="#D9B7AC" strokeWidth="0.7" />
          <circle cx="0" cy="0" r="1.8" fill="#E6BE7A" />
        </g>
      )}
    </svg>
  );
};

/**
 * Blush wax seal with a subtle embossed heart-rose crest.
 */
export const WaxSealIllustration: React.FC<SvgProps> = ({ className = '', size = 68 }) => {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`wax-${id}`} cx="38%" cy="34%" r="65%">
          <stop offset="0%" stopColor="#F3DDE3" />
          <stop offset="55%" stopColor="#DFACB9" />
          <stop offset="100%" stopColor="#BA7587" />
        </radialGradient>
      </defs>
      {/* Organic wax outer rim */}
      <path
        d="M40 7C47.5 6.5 55.2 9.2 61.5 14.8C67.4 20.1 72.5 27.6 72.2 37.2C71.9 46.8 68.5 55.4 61.8 62.5C55.4 69.2 46.2 72.8 36.8 72.2C27.4 71.6 18.2 67.4 13 59.4C7.8 51.4 6.5 41.2 9.2 31.8C11.9 22.4 18.5 14.5 27.2 10.2C31.3 8.1 35.6 7.3 40 7Z"
        fill={`url(#wax-${id})`}
        stroke="#A45E71"
        strokeWidth="1.2"
      />
      {/* Pressed inner seal ring */}
      <circle
        cx="40"
        cy="40"
        r="22"
        fill="#E5B7C3"
        stroke="#B57082"
        strokeWidth="1.4"
        opacity="0.85"
      />
      <circle cx="40" cy="40" r="18.5" stroke="#FFF9F5" strokeWidth="0.7" opacity="0.55" />
      {/* Embossed heart */}
      <path
        d="M40 50.5C40 50.5 28.5 43 28.5 35.4C28.5 31.5 31.5 28.8 35.1 28.8C37.5 28.8 39.2 30.1 40 31.6C40.8 30.1 42.5 28.8 44.9 28.8C48.5 28.8 51.5 31.5 51.5 35.4C51.5 43 40 50.5 40 50.5Z"
        fill="#783D50"
        opacity="0.78"
      />
      <path
        d="M35.5 32.8C33.8 32.8 32.5 34.1 32.5 35.8"
        stroke="#FFF9F5"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
};

/**
 * Delicate botanical rose & vine flourish for section dividers and cards.
 */
export const BotanicalRoseFlourish: React.FC<SvgProps> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 160 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Flowing gold/burgundy stem */}
      <path
        d="M14 58C38 56 54 44 79 47C104 50 124 41 146 38"
        stroke="#C9A77B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M52 49C46 39 39 34 32 34"
        stroke="#7A8F74"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M106 46C113 36 121 31 129 31"
        stroke="#7A8F74"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M36 48C29 44 26 37 31 32C37 34 40 41 36 48Z"
        fill="#A4B89D"
        fillOpacity="0.45"
        stroke="#6B8265"
        strokeWidth="0.9"
      />
      <path
        d="M121 44C128 40 132 33 127 28C121 30 117 37 121 44Z"
        fill="#A4B89D"
        fillOpacity="0.45"
        stroke="#6B8265"
        strokeWidth="0.9"
      />
      <path
        d="M66 50C64 58 58 64 51 62C53 55 59 50 66 50Z"
        fill="#A4B89D"
        fillOpacity="0.35"
        stroke="#6B8265"
        strokeWidth="0.9"
      />

      {/* Central blush rose */}
      <g transform="translate(80 42)">
        <circle cx="0" cy="0" r="14" fill="#F3DDE3" stroke="#D9B7AC" strokeWidth="1" />
        <path
          d="M-8 -3C-8 -9 0 -11 5 -8C10 -5 10 4 4 8C-2 11 -10 7 -8 -3Z"
          fill="#EBC6D0"
          stroke="#B57082"
          strokeWidth="0.9"
        />
        <path
          d="M-4 -1C-4 -5 1 -6 4 -4C6 -2 6 3 2 5C-2 6 -5 3 -4 -1Z"
          fill="#D998AA"
          stroke="#783D50"
          strokeWidth="0.8"
        />
        <path
          d="M-1.5 0C-1.5 -2 1.5 -2 2 0C2.5 2 -0.5 3 -1.5 0Z"
          fill="#783D50"
          opacity="0.7"
        />
      </g>

      {/* Small companion buds */}
      <circle cx="44" cy="36" r="4.5" fill="#F3DDE3" stroke="#C9A77B" strokeWidth="0.9" />
      <circle cx="117" cy="33" r="4" fill="#EBC6D0" stroke="#C9A77B" strokeWidth="0.9" />
      <circle cx="24" cy="56" r="2" fill="#C9A77B" opacity="0.6" />
      <circle cx="137" cy="39" r="2" fill="#C9A77B" opacity="0.6" />
    </svg>
  );
};

/**
 * Animated Rose Illustration for the Final Section.
 */
export const AnimatedRoseIllustration: React.FC<SvgProps> = ({ className = '', size = 112 }) => {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 112 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Stem */}
      <path
        d="M56 58C55 76 57 96 55 118"
        stroke="#5E7A58"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M55 82C42 79 34 71 36 62C46 64 53 71 55 82Z"
        fill="#8CA884"
        fillOpacity="0.65"
        stroke="#4E6B48"
        strokeWidth="1.1"
      />
      <path
        d="M56 92C69 89 77 81 75 72C65 74 58 81 56 92Z"
        fill="#8CA884"
        fillOpacity="0.65"
        stroke="#4E6B48"
        strokeWidth="1.1"
      />
      {/* Calyx */}
      <path
        d="M46 54C50 58 54 60 56 60C58 60 62 58 66 54L56 50L46 54Z"
        fill="#6B8A64"
        stroke="#4E6B48"
        strokeWidth="1"
      />
      {/* Outer Blush Petals */}
      <path
        d="M56 16C40 16 30 28 32 42C34 52 44 57 56 57C68 57 78 52 80 42C82 28 72 16 56 16Z"
        fill="#F3DDE3"
        stroke="#C58B9A"
        strokeWidth="1.1"
      />
      {/* Mid Rose Petals */}
      <path
        d="M39 36C37 25 46 19 56 20C67 21 74 29 72 39C70 49 62 53 56 53C48 53 41 47 39 36Z"
        fill="#EBC6D0"
        stroke="#A45E71"
        strokeWidth="1.1"
      />
      {/* Inner Deep Blush Swirl */}
      <path
        d="M46 35C46 27 52 24 57 25C63 26 66 32 64 38C62 44 55 46 50 44C46 42 46 38 46 35Z"
        fill="#D68C9F"
        stroke="#783D50"
        strokeWidth="1"
      />
      <path
        d="M52 34C52 30 57 29 59 32C61 35 58 39 54 38C51 37 52 34 52 34Z"
        fill="#783D50"
        opacity="0.72"
      />
      {/* Soft gold sparkles */}
      <circle cx="24" cy="30" r="1.6" fill="#C9A77B" className="animate-shimmer-soft" />
      <circle cx="88" cy="26" r="1.8" fill="#C9A77B" className="animate-shimmer-soft" />
    </svg>
  );
};

export const PetalSvg: React.FC<{ color?: string; size?: number }> = ({
  color = '#EBC6D0',
  size = 16,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2C16.5 4.8 19.5 10.2 18.2 15.6C17.2 19.6 13.8 22 10.4 21.4C6.8 20.8 4.4 17 5.2 12.6C6 8.2 9.2 4.2 12 2Z"
      fill={color}
      fillOpacity="0.82"
    />
  </svg>
);

export const TinyBlossomSvg: React.FC<{ color?: string; size?: number }> = ({
  color = '#F3DDE3',
  size = 18,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="6.5" r="3.5" fill={color} />
    <circle cx="17.2" cy="10.3" r="3.5" fill={color} />
    <circle cx="15.2" cy="16.2" r="3.5" fill={color} />
    <circle cx="8.8" cy="16.2" r="3.5" fill={color} />
    <circle cx="6.8" cy="10.3" r="3.5" fill={color} />
    <circle cx="12" cy="12" r="2.2" fill="#C9A77B" />
  </svg>
);

export const TinyHeartSvg: React.FC<{ color?: string; size?: number }> = ({
  color = '#C83E50',
  size = 14,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 20.5C12 20.5 3.5 14.5 3.5 8.6C3.5 5.4 6 3 9 3C10.9 3 12 4.1 12 4.1C12 4.1 13.1 3 15 3C18 3 20.5 5.4 20.5 8.6C20.5 14.5 12 20.5 12 20.5Z"
      fill={color}
      fillOpacity="0.88"
    />
  </svg>
);
