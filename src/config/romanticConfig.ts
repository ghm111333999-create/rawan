// Central customizable configuration for "A Little World, Just for You"
// Replace any image path below with your own uploaded files placed in:
//   /public/images/memories/
//   /public/images/illustrations/
//   /public/images/flowers/
// And replace the audio track by placing your MP3 at:
//   /public/music/romantic-piano.mp3

import heroFloralImg from '../assets/images/hero_floral_still_life_1794521635442.jpg';
import illustrationGardenImg from '../assets/images/illustration_strawberry_garden_1794521634274.jpg';

export interface MemoryItem {
  id: string;
  slotLabel: string;
  caption: string;
  dateLabel: string;
  locationLabel: string;
  story: string;
  imageSrc: string;
  imageAlt: string;
  kind: 'photograph' | 'illustration';
  aspectClass: string;
  tiltDegrees: number;
}

export const romanticConfig = {
  brandTitle: 'A Little World',

  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'love-letter', label: 'Love Letter' },
    { id: 'memories', label: 'Memories' },
    { id: 'surprise', label: 'Surprise' },
  ],

  intro: {
    headline: 'A Little World, Just for You.',
    subheadline: 'I made something special for someone even more special.',
    enterButton: 'Enter My Little World ♡',
    musicHint: 'Play gentle piano ambiance',
  },

  hero: {
    kicker: 'Written with love · For you',
    headline: 'To My Favorite Person.',
    subheadline:
      "Some people make the world more beautiful just by being in it. You're one of them.",
    scrollPrompt: "There's something special waiting for you...",
    heroImage: heroFloralImg,
    heroImageAlt: 'Blush and burgundy garden roses with wild strawberries and champagne ribbon on warm stone',
  },

  loveLetter: {
    sectionEyebrow: 'Section I · From My Heart',
    envelopeHeading: 'A Letter From My Heart',
    openButton: 'Open Your Letter ♡',
    closeButton: 'Fold Letter Back',
    signatureLabel: 'Forever yours',
    paragraphs: [
      'My Dearest,',
      "I don't think words will ever be enough to explain how special you are to me.",
      "You make ordinary moments feel extraordinary, and even the simplest days become beautiful when you're part of them.",
      'I wanted to create something that belongs only to you. A little place where you can always find a reminder of how much you mean to me.',
      "If I could choose again, I'd still choose you.",
      'With all my love. ♡',
    ],
  },

  memories: {
    sectionEyebrow: 'Section II · Kept Close',
    heading: 'Our Little Memories',
    subheading:
      'Little frames of sunlight, quiet afternoons, and the moments that stay warm long after the day ends.',
    items: [
      {
        id: 'favorite-picture',
        slotLabel: 'Our favorite picture',
        caption: 'Strawberries, warm tea, and nowhere we needed to be.',
        dateLabel: 'Spring Afternoon',
        locationLabel: 'Under the olive trees',
        story:
          'An unhurried afternoon in the garden where time slowed down—just dappled sunlight, fresh strawberries, and your laugh.',
        imageSrc: '/images/memories/1.jpeg',
        imageAlt: 'Sunlit linen picnic blanket with strawberries in a ceramic bowl, blush roses, and two porcelain teacups',
        kind: 'photograph',
        aspectClass: 'aspect-[3/4]',
        tiltDegrees: -1.6,
      },
      {
        id: 'special-memory',
        slotLabel: 'A special memory',
        caption: 'Candlelight and a promise kept in quiet words.',
        dateLabel: 'Golden Twilight',
        locationLabel: 'The terrace garden',
        story:
          'Twilight settling over the roses, soft candlelight flickering across the table, and a note saved for a moment just like this.',
        imageSrc: '/images/memories/2.jpeg',
        imageAlt: 'Candlelit stone terrace table with blush peonies, crystal glassware, and a wax-sealed letter',
        kind: 'photograph',
        aspectClass: 'aspect-[4/3]',
        tiltDegrees: 1.4,
      },
      {
        id: 'little-moment',
        slotLabel: 'A little moment worth remembering',
        caption: 'Morning light through linen curtains and sweet tarts.',
        dateLabel: 'Slow Morning',
        locationLabel: 'By the sunlit window',
        story:
          'Even the simplest mornings feel like a small holiday when shared across a quiet table.',
        imageSrc: '/images/memories/3.jpeg',
        imageAlt: 'Morning window light falling across a travertine table with a strawberry tart and two warm coffees',
        kind: 'photograph',
        aspectClass: 'aspect-[3/4]',
        tiltDegrees: -1.1,
      },
      {
        id: 'romantic-illustration',
        slotLabel: 'A cute romantic illustration',
        caption: 'Wild strawberries and blush roses pressed in paper.',
        dateLabel: 'Keepsake Sketch',
        locationLabel: 'Botanical study',
        story:
          'A little botanical keepsake painted in blush, gold, and wild strawberry red—just for your corner of the world.',
        imageSrc: illustrationGardenImg,
        imageAlt: 'Botanical watercolor illustration of wild strawberries and blush garden roses on warm ivory paper',
        kind: 'illustration',
        aspectClass: 'aspect-square',
        tiltDegrees: 1.5,
      },
    ] as MemoryItem[],
  },

  surprise: {
    sectionEyebrow: 'Section III · Just Between Us',
    heading: 'Do You Know How Special You Are?',
    subheadline: 'I have something to tell you...',
    buttonLabel: 'Click for a Little Surprise ♡',
    revealedMessage:
      "If I had a thousand chances to live my life, I'd want to find you in every single one of them.",
    replayLabel: 'Send another shower of petals ♡',
  },

  hiddenStrawberry: {
    secretMessage: "Psst... You're my favorite person in every universe. ♡",
    title: 'You found the secret strawberry',
  },

  finalSection: {
    heading: 'And If You Ever Forget...',
    paragraphs: [
      'Never forget how loved, appreciated, and special you are.',
      'You are my favorite part of every day, and if I could make one wish, it would be to keep creating beautiful memories with you.',
    ],
    footerNote: 'Made with love, especially for you. ♡',
    backToTop: 'Back to the beginning ↑',
  },

  music: {
    trackPath: '/music/romantic-piano.mp3',
    defaultVolume: 0.28,
    trackLabel: 'Soft Romantic Piano',
  },
};
