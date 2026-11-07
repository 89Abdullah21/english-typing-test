import { WordListType } from "../types/typing";

export const COMMON_200: string[] = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it",
  "that", "for", "they", "I", "with", "as", "not", "on", "she", "at",
  "by", "this", "we", "you", "do", "but", "from", "or", "which", "one",
  "would", "all", "will", "there", "say", "who", "make", "when", "can", "more",
  "if", "no", "man", "out", "other", "so", "what", "time", "up", "go",
  "about", "than", "into", "could", "state", "only", "new", "year", "some", "take",
  "come", "these", "know", "see", "use", "get", "like", "then", "first", "any",
  "work", "now", "may", "such", "give", "over", "think", "most", "even", "find",
  "day", "also", "after", "way", "many", "must", "look", "before", "great", "back",
  "through", "long", "where", "much", "should", "well", "people", "down", "own", "just",
  "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place",
  "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write",
  "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop",
  "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another",
  "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point",
  "form", "child", "few", "small", "since", "against", "ask", "late", "home", "interest",
  "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again",
  "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however",
  "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact",
  "group", "play", "stand", "increase", "early", "course", "change", "help", "line"
];

export const EXPANDED_1K: string[] = [
  ...COMMON_200,
  "ability", "able", "aboard", "about", "above", "accept", "accident", "according", "account", "accurate",
  "achieve", "across", "action", "active", "activity", "actual", "addition", "address", "advance", "advantage",
  "adventure", "advice", "affect", "afraid", "afternoon", "agreement", "ahead", "airline", "airport", "alarm",
  "alcohol", "alive", "allow", "almost", "alone", "along", "already", "although", "always", "amazing",
  "ambition", "among", "amount", "analysis", "ancient", "anger", "angle", "animal", "annual", "answer",
  "anxiety", "anybody", "anymore", "anyone", "anything", "anyway", "anywhere", "apartment", "apparent", "appeal",
  "appear", "apple", "application", "approach", "appropriate", "approval", "approve", "area", "argue", "argument",
  "arise", "armor", "army", "around", "arrange", "arrangement", "arrest", "arrival", "arrive", "article",
  "artist", "artistic", "aspect", "assembly", "assert", "assess", "assessment", "asset", "assign", "assignment",
  "assist", "assistance", "assistant", "associate", "association", "assume", "assumption", "assure", "athlete", "athletic",
  "atmosphere", "attach", "attack", "attempt", "attend", "attention", "attitude", "attorney", "attract", "attraction",
  "attractive", "attribute", "audience", "author", "authority", "automatic", "available", "average", "avoid", "award",
  "aware", "awareness", "away", "awful", "baby", "balance", "ball", "bank", "bar", "barely",
  "barrier", "base", "baseball", "basic", "basically", "basis", "basket", "basketball", "battery", "battle",
  "beach", "bean", "bear", "beat", "beautiful", "beauty", "becoming", "bedroom", "beer", "beforehand",
  "behavior", "behind", "belief", "believe", "belong", "below", "belt", "bench", "benchmark", "bend",
  "beneath", "benefit", "beside", "besides", "best", "better", "beyond", "bicycle", "biggest", "bill",
  "billion", "binary", "binding", "biological", "bird", "birth", "birthday", "bitter", "black", "blade",
  "blame", "blanket", "blind", "block", "blood", "board", "boat", "body", "bomb", "bond",
  "bone", "book", "boom", "boot", "border", "born", "borrow", "boss", "bottle", "bottom",
  "boundary", "bowl", "box", "boy", "brain", "branch", "brand", "bread", "break", "breakfast",
  "breath", "breathe", "brick", "bridge", "brief", "bright", "brilliant", "bring", "broad", "broadcast",
  "brother", "brown", "brush", "budget", "build", "building", "bullet", "bunch", "burden", "burn",
  "business", "busy", "buyer", "cabin", "cabinet", "cable", "cake", "calculate", "calendar", "camera",
  "camp", "campaign", "campus", "canal", "cancel", "cancer", "candidate", "candle", "canvas", "capability",
  "capable", "capacity", "capital", "captain", "capture", "carbon", "card", "career", "careful", "carefully",
  "cargo", "carpet", "carrier", "carry", "cart", "case", "cash", "cast", "casual", "catalog",
  "catch", "category", "cattle", "cause", "cease", "ceiling", "celebrate", "celebration", "celebrity", "cell",
  "cemetery", "center", "central", "century", "ceremony", "certain", "certainly", "chain", "chair", "challenge",
  "chamber", "champion", "championship", "chance", "channel", "chapter", "character", "characteristic", "characterize", "charge",
  "charity", "chart", "chase", "cheap", "check", "cheek", "cheerful", "cheese", "chef", "chemical",
  "cherry", "chest", "chicken", "chief", "childhood", "chimney", "chip", "chocolate", "choice", "cholesterol",
  "choose", "church", "circle", "circuit", "circumstance", "citizen", "citizenship", "city", "civic", "civil",
  "claim", "class", "classic", "classroom", "clean", "clear", "clearly", "clerk", "clever", "client",
  "climate", "climb", "clinic", "clinical", "clock", "close", "closely", "closer", "closest", "clothes",
  "clothing", "cloud", "club", "clue", "cluster", "coach", "coal", "coalition", "coast", "coastal"
];

export const ADVANCED_WORDS: string[] = [
  "quizzically", "xylophonist", "syzygy", "mnemonic", "subpoena", "connoisseur", "bourgeois",
  "rendezvous", "idiosyncrasy", "antidisestablishmentarianism", "onomatopoeia", "schizophrenia",
  "phlegm", "rhythm", "zephyr", "cacophony", "ephemeral", "euphemism", "flabbergasted",
  "gobbledygook", "hippopotamus", "juxtaposition", "kaleidoscope", "labyrinthine", "larynx",
  "magnanimous", "nefarious", "obfuscation", "pernicious", "quintessential", "recalcitrant",
  "sesquipedalian", "tintinnabulation", "ululation", "verisimilitude", "whimsical", "xenophobia",
  "zeitgeist", "circumlocution", "bamboozled", "discombobulated", "kerfuffle", "perspicacious",
  "serendipity", "surreptitious", "vicissitude", "epiphany", "ineffable", "sonorous", "mellifluous",
  "solitude", "clandestine", "panacea", "paragon", "petrichor", "scintillating", "ubiquitous",
  "vociferous", "sagacious", "querulous", "pulchritude", "obsequious", "lugubrious", "inimical",
  "grandiloquent", "fastidious", "equanimity", "defenestration", "belligerent", "anachronism",
  "amorphous", "alacrity", "aberration", "acquiesce", "capricious", "catharsis", "deleterious",
  "ebullient", "facetious", "garrulous", "harangue", "iconoclast", "juxtapose", "lucid", "malleable"
];

export const QUOTES: string[] = [
  "The only way to do great work is to love what you do.",
  "Simplicity is prerequisite for reliability and elegance.",
  "Programs must be written for people to read, and only incidentally for machines to execute.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "First, solve the problem. Then, write the code.",
  "Knowledge is power, but enthusiasm pulls the switch.",
  "The secret of getting ahead is getting started.",
  "It is not that I'm so smart, but I stay with the questions much longer.",
  "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
  "In theory, there is no difference between theory and practice. In practice, there is.",
  "Talk is cheap. Show me the code.",
  "Experience is the name everyone gives to their mistakes."
];

export function getRandomWords(type: WordListType, count: number): string[] {
  if (type === "quotes") {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    const quoteWords = randomQuote.split(" ");
    if (quoteWords.length >= count) {
      return quoteWords.slice(0, count);
    }
    // Repeat quote words or chain quotes to fulfill count
    const result: string[] = [];
    while (result.length < count) {
      const q = QUOTES[Math.floor(Math.random() * QUOTES.length)].split(" ");
      for (const w of q) {
        result.push(w);
        if (result.length === count) break;
      }
    }
    return result;
  }

  let pool = COMMON_200;
  if (type === "expanded1k") pool = EXPANDED_1K;
  else if (type === "advanced") pool = ADVANCED_WORDS;

  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    words.push(pool[randomIndex]);
  }
  return words;
}
