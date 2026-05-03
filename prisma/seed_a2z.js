const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const a2zPatterns = [
  {
    name: "Step 1: Learn the basics",
    questions: [
      { title: "Count Digits", url: "https://leetcode.com/problems/count-digits/" },
      { title: "Reverse a Number", url: "https://leetcode.com/problems/reverse-integer/" },
      { title: "Check Palindrome", url: "https://leetcode.com/problems/palindrome-number/" },
      { title: "GCD Or HCF", url: "https://practice.geeksforgeeks.org/problems/lcm-and-gcd/" },
      { title: "Print 1 to N using Recursion", url: "https://practice.geeksforgeeks.org/problems/print-1-to-n-without-using-loops-1587115620/1" }
    ]
  },
  {
    name: "Step 2: Learn Important Sorting Techniques",
    questions: [
      { title: "Selection Sort", url: "https://practice.geeksforgeeks.org/problems/selection-sort/1" },
      { title: "Bubble Sort", url: "https://practice.geeksforgeeks.org/problems/bubble-sort/1" },
      { title: "Insertion Sort", url: "https://practice.geeksforgeeks.org/problems/insertion-sort/1" },
      { title: "Merge Sort", url: "https://practice.geeksforgeeks.org/problems/merge-sort/1" },
      { title: "Quick Sort", url: "https://practice.geeksforgeeks.org/problems/quick-sort/1" }
    ]
  },
  {
    name: "Step 3: Solve Problems on Arrays",
    questions: [
      { title: "Largest Element in Array", url: "https://practice.geeksforgeeks.org/problems/largest-element-in-array/1" },
      { title: "Check if Array Is Sorted and Rotated", url: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/" },
      { title: "Remove Duplicates from Sorted Array", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
      { title: "Move Zeroes", url: "https://leetcode.com/problems/move-zeroes/" },
      { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
      { title: "Sort Colors", url: "https://leetcode.com/problems/sort-colors/" },
      { title: "Majority Element", url: "https://leetcode.com/problems/majority-element/" },
      { title: "Kadane's Algorithm", url: "https://leetcode.com/problems/maximum-subarray/" },
      { title: "Next Permutation", url: "https://leetcode.com/problems/next-permutation/" },
      { title: "Merge Intervals", url: "https://leetcode.com/problems/merge-intervals/" }
    ]
  },
  {
    name: "Step 4: Binary Search",
    questions: [
      { title: "Binary Search", url: "https://leetcode.com/problems/binary-search/" },
      { title: "Search Insert Position", url: "https://leetcode.com/problems/search-insert-position/" },
      { title: "Find First and Last Position", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
      { title: "Search in Rotated Sorted Array", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { title: "Find Minimum in Rotated Sorted Array", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
      { title: "Koko Eating Bananas", url: "https://leetcode.com/problems/koko-eating-bananas/" },
      { title: "Allocate Books", url: "https://www.interviewbit.com/problems/allocate-books/" }
    ]
  },
  {
    name: "Step 5: Strings",
    questions: [
      { title: "Remove Outermost Parentheses", url: "https://leetcode.com/problems/remove-outermost-parentheses/" },
      { title: "Reverse Words in a String", url: "https://leetcode.com/problems/reverse-words-in-a-string/" },
      { title: "Largest Odd Number in String", url: "https://leetcode.com/problems/largest-odd-number-in-string/" },
      { title: "Longest Common Prefix", url: "https://leetcode.com/problems/longest-common-prefix/" },
      { title: "Isomorphic Strings", url: "https://leetcode.com/problems/isomorphic-strings/" },
      { title: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/" },
      { title: "String to Integer (atoi)", url: "https://leetcode.com/problems/string-to-integer-atoi/" }
    ]
  },
  {
    name: "Step 6: Learn LinkedList",
    questions: [
      { title: "Reverse a Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
      { title: "Middle of the Linked List", url: "https://leetcode.com/problems/middle-of-the-linked-list/" },
      { title: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { title: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/" },
      { title: "Palindrome Linked List", url: "https://leetcode.com/problems/palindrome-linked-list/" },
      { title: "Intersection of Two Linked Lists", url: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
      { title: "Add Two Numbers", url: "https://leetcode.com/problems/add-two-numbers/" }
    ]
  },
  {
    name: "Step 7: Recursion",
    questions: [
      { title: "Generate Parentheses", url: "https://leetcode.com/problems/generate-parentheses/" },
      { title: "Subsets", url: "https://leetcode.com/problems/subsets/" },
      { title: "Combination Sum", url: "https://leetcode.com/problems/combination-sum/" },
      { title: "Permutations", url: "https://leetcode.com/problems/permutations/" },
      { title: "N-Queens", url: "https://leetcode.com/problems/n-queens/" },
      { title: "Sudoku Solver", url: "https://leetcode.com/problems/sudoku-solver/" },
      { title: "Word Search", url: "https://leetcode.com/problems/word-search/" }
    ]
  },
  {
    name: "Step 8: Bit Manipulation",
    questions: [
      { title: "Power of Two", url: "https://leetcode.com/problems/power-of-two/" },
      { title: "Number of 1 Bits", url: "https://leetcode.com/problems/number-of-1-bits/" },
      { title: "Single Number", url: "https://leetcode.com/problems/single-number/" },
      { title: "Subsets", url: "https://leetcode.com/problems/subsets/" },
      { title: "Minimum Bit Flips to Convert Number", url: "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/" }
    ]
  },
  {
    name: "Step 9: Stack and Queues",
    questions: [
      { title: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/" },
      { title: "Min Stack", url: "https://leetcode.com/problems/min-stack/" },
      { title: "Next Greater Element I", url: "https://leetcode.com/problems/next-greater-element-i/" },
      { title: "LRU Cache", url: "https://leetcode.com/problems/lru-cache/" },
      { title: "Largest Rectangle in Histogram", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
      { title: "Sliding Window Maximum", url: "https://leetcode.com/problems/sliding-window-maximum/" },
      { title: "Online Stock Span", url: "https://leetcode.com/problems/online-stock-span/" }
    ]
  },
  {
    name: "Step 10: Sliding Window & Two Pointer",
    questions: [
      { title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { title: "Max Consecutive Ones III", url: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
      { title: "Longest Repeating Character Replacement", url: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
      { title: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring/" }
    ]
  },
  {
    name: "Step 11: Heaps",
    questions: [
      { title: "Kth Largest Element in an Array", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { title: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
      { title: "Merge k Sorted Lists", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
      { title: "Find Median from Data Stream", url: "https://leetcode.com/problems/find-median-from-data-stream/" }
    ]
  },
  {
    name: "Step 12: Greedy Algorithms",
    questions: [
      { title: "Assign Cookies", url: "https://leetcode.com/problems/assign-cookies/" },
      { title: "Jump Game", url: "https://leetcode.com/problems/jump-game/" },
      { title: "Jump Game II", url: "https://leetcode.com/problems/jump-game-ii/" },
      { title: "Minimum Platforms", url: "https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1" },
      { title: "Job Sequencing Problem", url: "https://practice.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1" }
    ]
  },
  {
    name: "Step 13: Binary Trees",
    questions: [
      { title: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { title: "Invert Binary Tree", url: "https://leetcode.com/problems/invert-binary-tree/" },
      { title: "Diameter of Binary Tree", url: "https://leetcode.com/problems/diameter-of-binary-tree/" },
      { title: "Lowest Common Ancestor of a Binary Tree", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
      { title: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { title: "Serialize and Deserialize Binary Tree", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" }
    ]
  },
  {
    name: "Step 14: Binary Search Trees",
    questions: [
      { title: "Search in a Binary Search Tree", url: "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
      { title: "Validate Binary Search Tree", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
      { title: "Lowest Common Ancestor of a Binary Search Tree", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
      { title: "Kth Smallest Element in a BST", url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" }
    ]
  },
  {
    name: "Step 15: Graphs",
    questions: [
      { title: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/" },
      { title: "Clone Graph", url: "https://leetcode.com/problems/clone-graph/" },
      { title: "Rotting Oranges", url: "https://leetcode.com/problems/rotting-oranges/" },
      { title: "Course Schedule", url: "https://leetcode.com/problems/course-schedule/" },
      { title: "Network Delay Time", url: "https://leetcode.com/problems/network-delay-time/" },
      { title: "Word Ladder", url: "https://leetcode.com/problems/word-ladder/" }
    ]
  },
  {
    name: "Step 16: Dynamic Programming",
    questions: [
      { title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
      { title: "House Robber", url: "https://leetcode.com/problems/house-robber/" },
      { title: "Coin Change", url: "https://leetcode.com/problems/coin-change/" },
      { title: "Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
      { title: "Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/" },
      { title: "Edit Distance", url: "https://leetcode.com/problems/edit-distance/" },
      { title: "Burst Balloons", url: "https://leetcode.com/problems/burst-balloons/" }
    ]
  },
  {
    name: "Step 17: Tries",
    questions: [
      { title: "Implement Trie (Prefix Tree)", url: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
      { title: "Design Add and Search Words Data Structure", url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
      { title: "Word Search II", url: "https://leetcode.com/problems/word-search-ii/" },
      { title: "Maximum XOR of Two Numbers in an Array", url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/" }
    ]
  }
];

async function main() {
  console.log('Deleting existing data...');
  await prisma.question.deleteMany();
  await prisma.pattern.deleteMany();

  console.log('Start seeding A2Z Sheet...');
  for (const p of a2zPatterns) {
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
    console.log(`Created/Updated pattern: ${pattern.name} with ${p.questions.length} questions`);
  }
  console.log('A2Z Seeding finished.');
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
