import { lazy, Suspense } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import SEO, { SITE_URL } from "@/components/SEO";
import { blogPosts } from "@/api/blog";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

// Full content keyed by slug
const blogContent: Record<string, { intro: string; sections: { heading: string; body: string }[] }> = {
  "top-10-rummy-strategies": {
    intro:
      "Whether you're a casual player or grinding cash tables, the right strategy separates consistent winners from the rest. Here are the top 10 strategies used by professional Realgameappsplayers in India.",
    sections: [
      {
        heading: "1. Sort Your Cards Immediately",
        body: "As soon as your cards are dealt, sort them by suit and colour. This gives you a clear picture of potential sequences and sets, and dramatically reduces the chance of discarding a useful card.",
      },
      {
        heading: "2. Form a Pure Sequence First",
        body: "A pure sequence (without a joker) is mandatory to declare. Prioritise completing it before building anything else — without it, even a perfect hand cannot win.",
      },
      {
        heading: "3. Use Jokers Wisely",
        body: "Jokers are powerful but limited. Save them for high-value sets or impure sequences rather than wasting them on low-point cards you can form naturally.",
      },
      {
        heading: "4. Watch Your Opponents' Discards",
        body: "The discard pile is a goldmine of information. Track what opponents throw to infer their hand, and avoid discarding cards that complete their melds.",
      },
      {
        heading: "5. Discard High-Point Cards Early",
        body: "Aces, Kings, Queens, and Jacks carry 10 points each. If they don't fit quickly into a meld, discard them early to reduce your deadwood count if an opponent declares.",
      },
      {
        heading: "6. Bluff with Middle Cards",
        body: "Middle cards (5–8) are flexible — they can form sequences on either side. Holding them confuses opponents who are tracking your likely melds.",
      },
      {
        heading: "7. Avoid Picking from the Open Pile Frequently",
        body: "Picking openly signals your hand's direction. Experienced opponents will stop discarding cards that help you. Mix open and closed draws strategically.",
      },
      {
        heading: "8. Know When to Drop",
        body: "A first-drop penalty is far smaller than the full-loss points from a bad hand. If your initial cards are hopeless, an early drop is the mathematically correct play.",
      },
      {
        heading: "9. Keep Track of Discarded Cards",
        body: "Maintaining a mental note of all discarded cards prevents you from waiting for cards that are already out of play — saving turns and improving decision-making.",
      },
      {
        heading: "10. Stay Calm Under Pressure",
        body: "Tilt — playing emotionally after a bad beat — is one of the biggest profit-killers. Set a session loss limit, stick to it, and return with a clear head.",
      },
    ],
  },
  "beginners-guide-rummy": {
    intro:
      "Online Realgameappsis India's most popular skill-based card game. If you're new, don't worry — the rules are simple, and this guide covers everything you need to go from zero to confident player.",
    sections: [
      {
        heading: "What is Rummy?",
        body: "Realgameappsis a card-matching game where the goal is to form valid melds — sequences (3+ consecutive cards of the same suit) and sets (3–4 cards of the same rank in different suits) — before your opponents.",
      },
      {
        heading: "Basic Rules",
        body: "A standard game uses 2 decks of 52 cards plus 4 jokers. Each player is dealt 13 cards. On your turn, draw one card (open or closed pile) and discard one. The first player to form valid melds with all 13 cards wins.",
      },
      {
        heading: "Types of Sequences",
        body: "A pure sequence has no joker (e.g., 5♥ 6♥ 7♥). An impure sequence uses a joker in place of a missing card (e.g., 5♥ Joker 7♥). You must have at least one pure sequence to declare.",
      },
      {
        heading: "Scoring",
        body: "In most platforms, the loser's unmatched cards are totalled as penalty points. Face cards (J, Q, K, A) = 10 pts each; numbered cards = face value; jokers = 0 pts.",
      },
      {
        heading: "Choosing a Platform",
        body: "Start on platforms offering free practice tables. RummyCircle, Junglee Rummy, and A23 are beginner-friendly with tutorials, free chips, and low-stakes tables.",
      },
      {
        heading: "Your First Steps",
        body: "Play free games for at least a week before depositing real money. Focus on completing pure sequences fast and keeping your deadwood low. Watch replays of lost games to learn from mistakes.",
      },
    ],
  },
  "rummy-vs-poker": {
    intro:
      "Both Realgameappsand poker are skill-based card games that are hugely popular in India. But they differ significantly in rules, skill requirements, and earning potential. Here's how they compare.",
    sections: [
      {
        heading: "Skill vs Luck Balance",
        body: "Realgameappshas a higher skill-to-luck ratio in the short run because you see all your cards and make deterministic meld decisions. Poker involves hidden information and significant short-term variance even for experts.",
      },
      {
        heading: "Learning Curve",
        body: "Realgameappsis easier to learn — basic rules take minutes to grasp. Poker's complexity (pot odds, position, bluffing, hand ranges) means mastery takes much longer.",
      },
      {
        heading: "Session Variance",
        body: "In rummy, a skilled player running average cards will still outperform consistently over time. In poker, even world-class players can run below expectation for months.",
      },
      {
        heading: "Earning Potential",
        body: "High-stakes poker has larger absolute pot sizes and more lucrative tournaments globally. However, competition is fierce. Rummy's Indian ecosystem has softer mid-stakes games with more consistent edges.",
      },
      {
        heading: "Legality in India",
        body: "Both games are recognised as skill games by Indian courts. However, they operate under different state-level regulations. Always verify legality in your state before playing for cash.",
      },
      {
        heading: "Which Should You Choose?",
        body: "If you prefer lower variance and quicker mastery, start with rummy. If you enjoy deep strategy, psychology, and are comfortable with high swings, poker may suit you better. Many serious players enjoy both.",
      },
    ],
  },
  "best-rummy-bonuses-april": {
    intro:
      "April 2025 is a great time to sign up on a new Realgameappsplatform. We've tracked the latest welcome bonuses, deposit offers, and referral rewards across the top Indian Realgameappss.",
    sections: [
      {
        heading: "How Welcome Bonuses Work",
        body: "Most platforms offer a percentage match on your first deposit (e.g., 100% up to ₹1,000). The bonus amount is usually released in installments as you play, based on rake contribution.",
      },
      {
        heading: "What to Look for in a Bonus",
        body: "Check the wagering requirement (how much you need to play to unlock the full bonus), the time limit, and whether the bonus applies to all game types or just specific tables.",
      },
      {
        heading: "Referral Bonuses",
        body: "Most apps offer ₹50–₹500 for each friend you refer who deposits. If you have an active gaming group, referral programs can generate meaningful extra income.",
      },
      {
        heading: "Reload and Daily Bonuses",
        body: "Regular players benefit from reload bonuses (on subsequent deposits), daily cashback on losses, and VIP/loyalty programs that return a percentage of rake in cash or bonus chips.",
      },
      {
        heading: "Tips to Maximise Offers",
        body: "Read terms carefully before depositing. Use the minimum deposit that qualifies for the bonus. Clear the wagering requirement on your strongest game variant to unlock cash faster.",
      },
    ],
  },
  "responsible-gaming-tips": {
    intro:
      "Realgameappsis meant to be fun, exciting, and rewarding. But like all forms of real-money gaming, it carries risk. These five principles will help you stay in control and enjoy the game responsibly.",
    sections: [
      {
        heading: "1. Set a Budget Before You Play",
        body: "Decide the maximum you're willing to lose in a session, week, and month — and treat these as hard limits. Never use money earmarked for rent, groceries, or savings.",
      },
      {
        heading: "2. Set a Time Limit",
        body: "Long sessions cause fatigue, which leads to poor decisions and chasing losses. Use your phone's screen-time tools or in-app session timers to cap your play.",
      },
      {
        heading: "3. Never Chase Losses",
        body: "The urge to 'win it back' after a losing session is one of the most dangerous patterns in gaming. Accept that variance exists, close the app, and return with fresh perspective.",
      },
      {
        heading: "4. Take Regular Breaks",
        body: "Step away every 30–45 minutes during a session. Physical movement, water, and rest reset your focus and prevent the tunnel vision that leads to mistakes.",
      },
      {
        heading: "5. Use Platform Self-Exclusion Tools",
        body: "All licensed Realgameappsplatforms in India are required to offer deposit limits, cooling-off periods, and self-exclusion options. If you feel you're losing control, use them — no shame attached.",
      },
    ],
  },
  "rummy-legality-india": {
    intro:
      "Online rummy's legal status in India is a nuanced topic. Here is a comprehensive breakdown of the current legal landscape, key court rulings, and what it means for players in 2025.",
    sections: [
      {
        heading: "The Supreme Court's Position",
        body: "The Supreme Court of India has repeatedly upheld Realgameappsas a game of skill, not chance — most notably in the landmark K.R. Lakshmanan vs Tamil Nadu (1996) judgment. Skill games are exempt from the Public Gambling Act of 1867.",
      },
      {
        heading: "State-Level Restrictions",
        body: "Despite the central position, six states have enacted laws that ban online real-money skill games: Andhra Pradesh, Telangana, Assam, Odisha, Nagaland (specific licences needed), and Sikkim (licence required). Players in these states cannot legally play for cash.",
      },
      {
        heading: "The Online Skill Gaming Regulation (2023)",
        body: "The Ministry of Electronics and IT introduced a framework in 2023 requiring online gaming intermediaries to register and follow responsible gaming norms. Compliant platforms display a verification mark.",
      },
      {
        heading: "TDS on Winnings",
        body: "Since April 2023, net winnings from online games are taxed at 30% TDS per withdrawal event, with no ₹10,000 threshold exemption. Platforms deduct this automatically; you must declare winnings in your ITR.",
      },
      {
        heading: "How to Verify a Platform's Legality",
        body: "Look for platforms registered as Online Skill Gaming Intermediaries under the IT Rules 2021, with a Grievance Officer listed and KYC compliance. Avoid unregistered offshore apps.",
      },
      {
        heading: "Bottom Line for Players",
        body: "If you're in a permissive state, playing on a compliant platform is entirely legal. Pay your taxes, use KYC-verified accounts, and stick to registered apps to stay on the right side of the law.",
      },
    ],
  },
};

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const content = blogContent[post.slug];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      author: { "@type": "Organization", name: "Realgameapps" },
      publisher: {
        "@type": "Organization",
        name: "Realgameapps",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
      },
      articleSection: post.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${post.title} | Realgameapps Blog`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={jsonLd}
        keywords={`${post.category.toLowerCase()}, Realgameappstips india, online rummy, Realgameappsguide`}
      />

      <Suspense fallback={null}> 
        <Header />
      </Suspense>

      {/* Hero */}
      <section
  className="py-14 md:py-20 bg-cover bg-center"
  style={
    post.background?.startsWith("/images")
      ? { backgroundImage: `url(${post.background})` }
      : {}
  }
>
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full">
                <Tag className="w-3 h-3" /> {post.category}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-5 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime} read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Body */}
      <main className="container max-w-3xl py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-slate dark:prose-invert max-w-none"
        >
          {/* Intro */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">{content?.intro ?? post.excerpt}</p>

          {/* Sections */}
          {content?.sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="mb-8"
            >
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">{section.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.body}</p>
            </motion.section>
          ))}
        </motion.article>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
        </div>

        {/* Related posts */}
        <section className="mt-12">
          <h3 className="font-heading text-lg font-bold text-foreground mb-5">More Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="flex gap-3 items-start p-4 rounded-xl border border-border bg-card hover:shadow-card-hover transition-all group"
                >
                  <div className={`bg-gradient-to-br ${p.background} w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center`}>
                    <span className="text-white font-bold text-xs">{String(p.id).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {p.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.readTime} read</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default BlogDetail;
