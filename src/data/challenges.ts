import img1 from "@/assets/img1.jpeg";
import img2 from "@/assets/img2.jpeg";
import img3 from "@/assets/img3.jpeg";
import img4 from "@/assets/img4.jpeg";
import img5 from "@/assets/img11.jpeg";
import img6 from "@/assets/img6.jpeg";
import img7 from "@/assets/img7.jpeg";
import img8 from "@/assets/img8.jpeg";
import img9 from "@/assets/img9.jpeg";
import img10 from "@/assets/img10.jpeg";

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
    image: img1,
    rewardTitle: "Note #1 — You Fixed Me Too",
    note: "You just put a scrambled picture back together, NOw you realize how beautiful you are I know it is little hard to assemble but i know you have smart brain but you dont use it always hehe I love you but seriously see how gorgeous you are Honey.",
    signoff: "Always sliding towards you",
  },
  {
    id: "memory",
    kind: "puzzle",
    title: "Memory of Us",
    tagline: "Match the pairs. Warning: I remember everything you said. Everything.",
    emoji: "🃏",
    image: img2,
    rewardTitle: "Note #2 — I Keep Every Detail",
    note: " Okay so you reached here not bad not bad Baby you r very smart , you should always use your smartness hnn but not on me you naughty gurl , okay see the image and try to remember that moment love you crack the code to click photos by keeping the phone at that flower pot or whatever we call it and then this masterpiece clicked see how beautiful you were looking in thi kurta and your cute and lovydoby smile killing it i'm not much handsome here but How lovely we were looking together yus aur no Honey hmm hmm.",
    signoff: "Your personal hard drive",
  },
  {
    id: "scramble",
    kind: "puzzle",
    title: "Unscramble My Feelings",
    tagline: "Three words. All about you. Yes, I struggle to say them out loud too.",
    emoji: "🔤",
    image: img3,
    rewardTitle: "Note #3 — Words I Mean",
    note: "Okay so you reached here i can feel the blushings on your face while reading all this love you bchaa and missing you too , okay dont be emotional its night So see the image how awkward(spell check plz) we were during clicking this image but it is the one of the most purest image of us together with your dearest Hanumanji ....okay mine also but see yrr the who clicks the picture only notices your pose not mine just boys things kitni galat baat hai but its okay no other options we have that time I love you Mylady.",
    signoff: "Yours, BNDAAA",
  },
  {
    id: "riddle",
    kind: "puzzle",
    title: "Emoji Riddles",
    tagline: "Decode my nonsense. It's basically how you text me anyway.",
    emoji: "🕵️",
    image: img4,
    rewardTitle: "Note #4 — You Get Me",
    note: "HAHA the movie night my god bbyy we should consider the coctail movie but we go for Alpha and that movie make us soo much alpha ki hall se nikl gye haha By the way you were looking very Beautiful and that day was very memorable for me like this is one of my favorite things ki we go for movie in night do some naughty things in theater and after the movie we walk for some time in silent night and talk and walk and talk how beautiful it was hai nn I love this kind of things veryyy much love you bbygurl apart from this do you remember that rapido driver fuck bhay meri fat gyi thi uski speeding se tumhari kya hi btau bss mn me chl rha tha we will reach safely and aisa hi hua but it was horrific hai nnn but you dont have to worry when im with you understood ....HNNJI smjh gyii ... good honey love uuuuh.",
    signoff: "Your personal Peace..",
  },
  {
    id: "sequence",
    kind: "puzzle",
    title: "Heartbeat Sequence",
    tagline: "Repeat the rhythm. It's the pattern my heart does when you touch me .",
    emoji: "💓",
    image: img5,
    rewardTitle: "Note #5 — That's My Heartbeat",
    note: "Congratulations, you just played my heartbeat. It does exactly that when you walk into a room, when your name lights up my phone, and when you fall asleep mid-sentence on a call.and if i talk about this image i dont know when you clicked it i found it in my gallery in this you were looking sooo amzing like kaise btauu yk veryyy beautiful seriously mylove i'm in love with this image from nowever.",
    signoff: "Beating for you",
  },
  {
    id: "catch",
    kind: "game",
    title: "Catch My Falling Hearts",
    tagline: "I keep dropping them around you. Catch 12 before time runs out.",
    emoji: "💘",
    image: img6,
    rewardTitle: "Note #6 — I Fell First",
    note: "You caught them all, great job, from where you got this talent hmm bty see the image on that same way i catch you by falling so many time cuz we have drunked that day was soooooooo amazing yrr hai remeber we have have talked for a long while eating those noodles which we not leave at restro and in this dress you were looking soo hot and sexy you cant understand how i hold my feeling to not melt cuz you were looking sooo hot honey and veryy beautiful too i like those innocense on your face while you drunk and became child also adult haha overall Love you sooo much bchaa . ",
    signoff: "Still falling, no regrets",
  },
  {
    id: "quiz",
    kind: "game",
    title: "How Well Do You Know Me?",
    tagline: "A quiz about me. Be honest. Be brutal. Be right.",
    emoji: "❓",
    image: img7,
    rewardTitle: "Note #7 — You Know Me Best",
    note: "You know me better than I know myself, and that's terrifying in the best way.you know which silence means 'tired' and which means 'talk to me'. Being truly known by you is seriously a gift for me i always want this and also try to be like this whatever reasons come between us for fights never keep it in mind at the i know ho you are and how much you love me one thing i want to say love i will always by your side in every situation its not im just saying in flow if i'm saying this i mean it I love you sooo much yrrr so how can i ever try to hurt you never if ever i'm doing this tumhe btaa du i regret more nd moree for that and hurt myself not physically by mentally and trying to make that thing right i always use this cuz i know whatever happens between us we love each other badly and nothing can come between us never be sured mylove I love you.",
    signoff: "fully yours",
  },
  {
    id: "whack",
    kind: "game",
    title: "Whack-a-Doubt",
    tagline: "Every doubt that pops up? Smash it. That's my job description.",
    emoji: "🔨",
    image: img8,
    rewardTitle: "Note #8 — No Room For Doubt",
    note: "You just spent a whole minute smashing doubts, and honestly that's what I'd like to do for you forever. Any day you feel not enough, too much, or unsure — remember someone chose you loudly and would choose you again in every version of this life(this line is by AI but im not erasing it cuz i liked it it explains what i shy or not able to say) and in this dress you were looking veryy gorgeous mylove and hot also i cant stop looking at this pictures while i scroll my album that was the first time you have wear short dress and i've seen you have managed it well and your looks oh my god how could i say it was sooooo worthseeing(yk what i mean) mylove .",
    signoff: "Your doubt-remover",
  },
  {
    id: "rps",
    kind: "game",
    title: "Rock, Paper, Kisses",
    tagline: "Best of three. Loser owes affection. Honestly, you win either way.",
    emoji: "✌️",
    image: img9,
    rewardTitle: "Note #9 — You Always Win",
    note: "You won, obviously. You always do — arguments, LUDO, dance with me, Carram. and my entire heart. and for me its very special moment when you won your cute smile and that inocense i like it and also it is beneficial for me cuz i loose so you owes kisses from me and i am going to kiss you for very long  so be prepared as you can see in image you have give me these good looking marks which i loved but also its create trouble cuz im also a clg persong and that TT on station bhay sahab meet me this time you will learn so be Ready my hotgurl I love you.",
    signoff: "your HOTBOY",
  },
  {
    id: "typing",
    kind: "game",
    title: "Say It Fast",
    tagline: "Type the sentence before the timer dies. Romance, but with pressure.",
    emoji: "⌨️",
    image: img10,
    rewardTitle: "Note #10 — The Final One",
    note: "You made it to the end. Ten challenges, ten notes, and one very simple point behind all of them: you are my favourite person, my lovely love i really enjoy our relationship before we met i scared of relationship but now i understand why i was scared cuz you are not there and now see i'm becoming lovydoby guy day by day and i liked it seriously miss I really love this relationship and bond with you ik nobody can love this much as you do , i always try to make you feel loved somtimes it goes wrong but its okayy i will change myself and my bad habits(not for you its for me cuz i dont want you to think ki i have left those things for you i want you to feel like ki  yuss he's my boy and he understand what necessary things are and seriously i understan for becoming a man a real man people have to be disiciplined and also should change themselve as required for their personality cuz it is necessary things and iske liye koe aapko bolo then you are doing is not good thing you do it by self realising is great thing and you know i'm a greate work doner hehe I love you Miss seriously kaise btau kya chij se feel kraya ja skta hai yusssssssssss i love youuuuu sooo muchhh.",
    signoff: "Forever yours, Honey",
  },
];
