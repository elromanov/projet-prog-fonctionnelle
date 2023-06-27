// shift :: [t] -> [t]
const shift = liste => liste.slice(1, liste.length);

// reduce :: (t -> t -> t) -> t -> [t] -> t
const reduce = f => acc => liste => (liste.length > 0) ? reduce(f)(f(acc)(liste[0]))(shift(liste)) : acc;

// reduce1 :: (t -> t -> t) -> [t] -> t
const reduce1 = f => liste => reduce(f)(liste[0])(shift(liste));

// reduceRight :: (t -> t -> t) -> t -> [t] -> t
const reduceRight = f => acc => liste => (liste.length > 0) ? reduceRight(f)(f(liste[liste.length - 1])(acc))(shiftRight(liste)) : acc;

// reduceRight1 :: (t -> t -> t) -> [t] -> t
const reduceRight1 = f => liste => reduceRight(f)(liste[0])(shift(liste));