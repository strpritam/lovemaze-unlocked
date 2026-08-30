import love1 from "@/assets/love-1.jpg";
import love2 from "@/assets/love-2.jpg";
import love3 from "@/assets/love-3.jpg";
import love4 from "@/assets/love-4.jpg";
import love5 from "@/assets/love-5.jpg";

export type ChallengeKind = "puzzle" | "game";

export interface Challenge {
  id: string;
  kind: ChallengeKind;
  title: string;
  tagline: string;
  emoji: string;
  image: string;
  rewardTitle: string;
  /** The love note she unlocks. Edit these freely. */
  note: string;
  signoff: string;
}

export const challenges: Challenge[] = [
  {
    id: "slide",
    kind: "puzzle",
    title: "Scrambled Heart",
    tagline: "Slide the tiles until the picture makes sense — like you did with my life.",
    emoji: "🧩",
    image: love1,
    rewardTitle: "Note #1 — You Fixed Me Too",
    note: "You just put a scrambled picture back together, which is honestly your whole personality. You did the same thing to me. I was fine, sure, but I was out of order — and then you slid into place and suddenly everything lined up. I love how you make chaos look like a plan.",
    signoff: "Always sliding towards you",
  },
  {
    id: "memory",
    kind: "puzzle",
    title: "Memory of Us",
    tagline: "Match the pairs. Warning: I remember everything you said. Everything.",
    emoji: "🃏",
    image: love2,
    rewardTitle: "Note #2 — I Keep Every Detail",
    note: "You matched the pairs faster than I expected, which is unfair because I'm the one who memorises your coffee order, your bad-day face, and the exact laugh you do when you think a joke is stupid but funny. Every tiny detail about you is stored somewhere permanent in me.",
    signoff: "Your personal hard drive",
  },
  {
    id: "scramble",
    kind: "puzzle",
    title: "Unscramble My Feelings",
    tagline: "Three words. All about you. Yes, I struggle to say them out loud too.",
    emoji: "🔤",
    image: love3,
    rewardTitle: "Note #3 — Words I Mean",
    note: "Unscrambling words is easier than saying them, apparently. So here they are in the right order: I am completely, embarrassingly, permanently in love with you. Not the cute Instagram kind — the kind where I plan my future around your laugh.",
    signoff: "Yours, out loud this time",
  },
  {
    id: "riddle",
    kind: "puzzle",
    title: "Emoji Riddles",
    tagline: "Decode my nonsense. It's basically how I text you anyway.",
    emoji: "🕵️",
    image: love4,
    rewardTitle: "Note #4 — You Get Me",
    note: "You decoded my nonsense in seconds. That's the thing about us — I can send you three random emojis at 2am and you understand exactly what I meant. Finding someone who speaks fluent 'you' is rare. Finding someone who speaks fluent 'me' is a miracle.",
    signoff: "Fluent in you",
  },
  {
    id: "sequence",
    kind: "puzzle",
    title: "Heartbeat Sequence",
    tagline: "Repeat the rhythm. It's the pattern my heart does when you walk in.",
    emoji: "💓",
    image: love5,
    rewardTitle: "Note #5 — That's My Heartbeat",
    note: "Congratulations, you just played my heartbeat. It does exactly that when you walk into a room, when your name lights up my phone, and when you fall asleep mid-sentence on a call. You are the rhythm I've quietly built my days around.",
    signoff: "Beating for you",
  },
  {
    id: "catch",
    kind: "game",
    title: "Catch My Falling Hearts",
    tagline: "I keep dropping them around you. Catch 12 before time runs out.",
    emoji: "💘",
    image: love1,
    rewardTitle: "Note #6 — I Fell First",
    note: "You caught them all, which is fitting, because I've been dropping hearts around you since the day we met. I fell first. I fell harder. And given the chance, I'd absolutely do the whole embarrassing thing again.",
    signoff: "Still falling, no regrets",
  },
  {
    id: "quiz",
    kind: "game",
    title: "How Well Do You Know Him?",
    tagline: "A quiz about me. Be honest. Be brutal. Be right.",
    emoji: "❓",
    image: love2,
    rewardTitle: "Note #7 — You Know Me Best",
    note: "You know me better than I know myself, and that's terrifying in the best way. You spot my mood before I do, you know which silence means 'tired' and which means 'talk to me'. Being truly known by you is the safest I've ever felt.",
    signoff: "Fully seen, fully yours",
  },
  {
    id: "whack",
    kind: "game",
    title: "Whack-a-Doubt",
    tagline: "Every doubt that pops up? Smash it. That's my job description.",
    emoji: "🔨",
    image: love3,
    rewardTitle: "Note #8 — No Room For Doubt",
    note: "You just spent a whole minute smashing doubts, and honestly that's what I'd like to do for you forever. Any day you feel not enough, too much, or unsure — remember someone chose you loudly and would choose you again in every version of this life.",
    signoff: "Your doubt-remover",
  },
  {
    id: "rps",
    kind: "game",
    title: "Rock, Paper, Kisses",
    tagline: "Best of three. Loser owes affection. Honestly, you win either way.",
    emoji: "✌️",
    image: love4,
    rewardTitle: "Note #9 — You Always Win",
    note: "You won, obviously. You always do — arguments, staring contests, the last piece of food, and my entire heart. I've made peace with losing to you because everything I lose to you, I get back doubled in the form of your smile.",
    signoff: "Happily defeated",
  },
  {
    id: "typing",
    kind: "game",
    title: "Say It Fast",
    tagline: "Type the sentence before the timer dies. Romance, but with pressure.",
    emoji: "⌨️",
    image: love5,
    rewardTitle: "Note #10 — The Final One",
    note: "You made it to the end. Ten challenges, ten notes, and one very simple point behind all of them: you are my favourite person, my calm and my chaos, my best decision. Thank you for playing along with my silly games — and for making real life feel like the best one.",
    signoff: "Forever, and then some",
  },
];
