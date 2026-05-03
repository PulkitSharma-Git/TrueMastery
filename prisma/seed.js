const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const patternsData = [
  {
    name: 'Arrays',
    questions: [
      { title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/' },
      { title: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      { title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/' },
    ]
  },
  {
    name: 'Linked List',
    questions: [
      { title: 'Reverse a Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/' },
      { title: 'Middle of the Linked List', url: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
      { title: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
    ]
  },
  {
    name: 'Dynamic Programming',
    questions: [
      { title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/' },
      { title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/' },
      { title: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
    ]
  },
  {
    name: 'Graphs',
    questions: [
      { title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/' },
      { title: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph/' },
      { title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/' },
    ]
  },
  {
    name: 'Binary Trees',
    questions: [
      { title: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
      { title: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/' },
      { title: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
    ]
  }
];

async function main() {
  console.log('Start seeding...');
  for (const p of patternsData) {
    const pattern = await prisma.pattern.upsert({
      where: { name: p.name },
      update: {},
      create: {
        name: p.name,
        questions: {
          create: p.questions.map(q => ({
            title: q.title,
            url: q.url,
            status: "Need to revise",
            revisionStep: 0,
            nextReviewDate: new Date()
          }))
        }
      }
    });
    console.log(`Created/Updated pattern: ${pattern.name}`);
  }
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
