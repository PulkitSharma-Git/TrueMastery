
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const a2zPatterns = [
  {
    "name": "Learn the basics",
    "questions": [
      {
        "title": "Input Output",
        "url": "https://takeuforward.org/c/c-basic-input-output/"
      },
      {
        "title": "Cpp Basics",
        "url": "https://takeuforward.org/data-structure/what-are-arrays-strings"
      },
      {
        "title": "If ElseIf",
        "url": "https://takeuforward.org/if-else/if-else-statements/"
      },
      {
        "title": "Switch Case",
        "url": "https://takeuforward.org/switch-case/switch-case-statements/"
      },
      {
        "title": "What are arrays, strings?",
        "url": "https://takeuforward.org/data-structure/what-are-arrays-strings"
      },
      {
        "title": "For loops",
        "url": "https://takeuforward.org/for-loop/understanding-for-loop/"
      },
      {
        "title": "While loops",
        "url": "https://takeuforward.org/while-loop/while-loops-in-programming/"
      },
      {
        "title": "Functions (Pass by Reference and Value)",
        "url": "https://takeuforward.org/data-structure/functions-pass-by-reference-and-value"
      },
      {
        "title": "Theory with examples",
        "url": "https://takeuforward.org/time-complexity/time-and-space-complexity-strivers-a2z-dsa-course/"
      },
      {
        "title": "Easy and Medium",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Hard",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 1",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 2",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 3",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 4",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 5",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 6",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 7",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 8",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 9",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 10",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 11",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 12",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 13",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 14",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 15",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 16",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 17",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 18",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 19",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 20",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 21",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "Pattern 22",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
      },
      {
        "title": "STL",
        "url": "https://takeuforward.org/c/c-stl-tutorial-most-frequent-used-stl-containers/"
      },
      {
        "title": "Java Collections",
        "url": "https://takeuforward.org/data-structure/java-collections"
      },
      {
        "title": "Count all Digits of a Number",
        "url": "https://takeuforward.org/data-structure/count-digits-in-a-number/"
      },
      {
        "title": "Reverse a number",
        "url": "https://leetcode.com/problems/reverse-integer/"
      },
      {
        "title": "Palindrome Number",
        "url": "https://leetcode.com/problems/palindrome-number/"
      },
      {
        "title": "GCD of Two Numbers",
        "url": "https://takeuforward.org/data-structure/find-gcd-of-two-numbers/"
      },
      {
        "title": "Check if the Number is Armstrong",
        "url": "https://leetcode.com/problems/armstrong-number/"
      },
      {
        "title": "Print all Divisors",
        "url": "https://takeuforward.org/data-structure/print-all-divisors-of-a-given-number/"
      },
      {
        "title": "Check for Prime Number",
        "url": "https://takeuforward.org/data-structure/check-if-a-number-is-prime-or-not/"
      },
      {
        "title": "Understand recursion by print something N times",
        "url": "https://takeuforward.org/recursion/introduction-to-recursion-understand-recursion-by-printing-something-n-times/"
      },
      {
        "title": "Print name N times using recursion",
        "url": "https://takeuforward.org/recursion/print-name-n-times-using-recursion/"
      },
      {
        "title": "Print 1 to N using Recursion",
        "url": "https://takeuforward.org/recursion/print-1-to-n-using-recursion/"
      },
      {
        "title": "Print N to 1 using Recursion",
        "url": "https://takeuforward.org/recursion/print-n-to-1-using-recursion/"
      },
      {
        "title": "Sum of First N Numbers",
        "url": "https://takeuforward.org/data-structure/sum-of-first-n-natural-numbers/"
      },
      {
        "title": "Factorial of a given number",
        "url": "https://takeuforward.org/data-structure/factorial-of-a-number-iterative-and-recursive"
      },
      {
        "title": "Reverse an array",
        "url": "https://takeuforward.org/data-structure/reverse-a-given-array/"
      },
      {
        "title": "Check if String is Palindrome or Not ",
        "url": "https://leetcode.com/problems/valid-palindrome/"
      },
      {
        "title": "Fibonacci Number",
        "url": "https://leetcode.com/problems/fibonacci-number/"
      },
      {
        "title": "Basic Hashing",
        "url": "https://takeuforward.org/hashing/hashing-maps-time-complexity-collisions-division-rule-of-hashing-strivers-a2z-dsa-course/"
      },
      {
        "title": "Counting Frequencies of Array Elements",
        "url": "https://takeuforward.org/data-structure/count-frequency-of-each-element-in-the-array/"
      },
      {
        "title": "Highest Occurring Element in an Array",
        "url": "https://leetcode.com/problems/frequency-of-the-most-frequent-element/"
      }
    ]
  },
  {
    "name": "Learn Important Sorting Techniques",
    "questions": [
      {
        "title": "Selection Sort",
        "url": "https://takeuforward.org/sorting/selection-sort-algorithm/"
      },
      {
        "title": "Bubble Sort",
        "url": "https://takeuforward.org/data-structure/bubble-sort-algorithm/"
      },
      {
        "title": "Insertion Sorting",
        "url": "https://takeuforward.org/data-structure/insertion-sort-algorithm/"
      },
      {
        "title": "Merge Sorting",
        "url": "https://takeuforward.org/data-structure/merge-sort-algorithm/"
      },
      {
        "title": "Recursive Bubble Sort",
        "url": "https://takeuforward.org/arrays/recursive-bubble-sort-algorithm/"
      },
      {
        "title": "Recursive Insertion Sort",
        "url": "https://takeuforward.org/arrays/recursive-insertion-sort-algorithm/"
      },
      {
        "title": "Quick Sorting",
        "url": "https://takeuforward.org/data-structure/quick-sort-algorithm/"
      }
    ]
  },
  {
    "name": "Solve Problems on Arrays [Easy -\\u003e Medium -\\u003e Hard]",
    "questions": [
      {
        "title": "Largest Element ",
        "url": "https://takeuforward.org/data-structure/find-the-largest-element-in-an-array/"
      },
      {
        "title": "Second Largest Element",
        "url": "https://takeuforward.org/data-structure/find-second-smallest-and-second-largest-element-in-an-array/"
      },
      {
        "title": "Check if the Array is Sorted II",
        "url": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/#:~:text=Input%3A%20nums%20%3D%20%5B2%2C,no%20rotation)%20to%20make%20nums."
      },
      {
        "title": "Remove duplicates from Sorted array",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/#:~:text=Input%3A%20nums%20%3D%20%5B0%2C,%2C%203%2C%20and%204%20respectively."
      },
      {
        "title": "Left Rotate Array by One",
        "url": "https://leetcode.com/problems/rotate-array/"
      },
      {
        "title": "Left Rotate Array by K Places",
        "url": "https://leetcode.com/problems/rotate-array/"
      },
      {
        "title": "Move Zeros to End",
        "url": "https://leetcode.com/problems/move-zeroes/"
      },
      {
        "title": "Linear Search",
        "url": "https://takeuforward.org/data-structure/linear-search-in-c/"
      },
      {
        "title": "Union of two sorted arrays",
        "url": "https://takeuforward.org/data-structure/union-of-two-sorted-arrays/"
      },
      {
        "title": "Find missing number",
        "url": "https://www.geeksforgeeks.org/find-the-missing-number/"
      },
      {
        "title": "Maximum Consecutive Ones",
        "url": "https://leetcode.com/problems/max-consecutive-ones/"
      },
      {
        "title": "Find the number that appears once, and other numbers twice.",
        "url": "https://leetcode.com/problems/single-number/"
      },
      {
        "title": "Longest subarray with given sum K(positives)",
        "url": "https://takeuforward.org/data-structure/longest-subarray-with-given-sum-k/"
      },
      {
        "title": "Longest subarray with sum K",
        "url": "https://takeuforward.org/data-structure/length-of-the-longest-subarray-with-zero-sum/"
      },
      {
        "title": "Two Sum",
        "url": "https://leetcode.com/problems/two-sum/"
      },
      {
        "title": "Sort an array of 0's 1's and 2's",
        "url": "https://leetcode.com/problems/sort-colors/"
      },
      {
        "title": "Majority Element-I",
        "url": "https://leetcode.com/problems/majority-element/"
      },
      {
        "title": "Kadane's Algorithm",
        "url": "https://leetcode.com/problems/maximum-subarray/"
      },
      {
        "title": "Print subarray with maximum subarray sum (extended version of above problem)",
        "url": "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/"
      },
      {
        "title": "Stock Buy and Sell",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
      },
      {
        "title": "Rearrange array elements by sign",
        "url": "https://leetcode.com/problems/rearrange-array-elements-by-sign/"
      },
      {
        "title": "Next Permutation",
        "url": "https://leetcode.com/problems/next-permutation/"
      },
      {
        "title": "Leaders in an Array",
        "url": "https://takeuforward.org/data-structure/leaders-in-an-array/"
      },
      {
        "title": "Longest Consecutive Sequence in an Array",
        "url": "https://leetcode.com/problems/longest-consecutive-sequence/solution/"
      },
      {
        "title": "Set Matrix Zeroes",
        "url": "https://leetcode.com/problems/set-matrix-zeroes/"
      },
      {
        "title": "Rotate matrix by 90 degrees",
        "url": "https://leetcode.com/problems/rotate-image/"
      },
      {
        "title": "Print the matrix in spiral manner",
        "url": "https://leetcode.com/problems/spiral-matrix/"
      },
      {
        "title": "Count subarrays with given sum",
        "url": "https://leetcode.com/problems/subarray-sum-equals-k/"
      },
      {
        "title": "Pascal's Triangle I",
        "url": "https://leetcode.com/problems/pascals-triangle/"
      },
      {
        "title": "Majority Element-II",
        "url": "https://leetcode.com/problems/majority-element-ii/"
      },
      {
        "title": "3 Sum",
        "url": "https://leetcode.com/problems/3sum/"
      },
      {
        "title": "4 Sum",
        "url": "https://leetcode.com/problems/4sum/"
      },
      {
        "title": "Largest Subarray with Sum 0",
        "url": "https://takeuforward.org/data-structure/length-of-the-longest-subarray-with-zero-sum/"
      },
      {
        "title": "Count subarrays with given xor K",
        "url": "https://takeuforward.org/data-structure/count-the-number-of-subarrays-with-given-xor-k/"
      },
      {
        "title": "Merge Overlapping Subintervals",
        "url": "https://leetcode.com/problems/merge-intervals/"
      },
      {
        "title": "Merge two sorted arrays without extra space",
        "url": "https://leetcode.com/problems/merge-sorted-array/"
      },
      {
        "title": "Find the repeating and missing number",
        "url": "https://takeuforward.org/data-structure/find-the-repeating-and-missing-numbers/"
      },
      {
        "title": "Count Inversions",
        "url": "https://takeuforward.org/data-structure/count-inversions-in-an-array"
      },
      {
        "title": "Reverse Pairs",
        "url": "https://leetcode.com/problems/reverse-pairs/"
      },
      {
        "title": "Maximum Product Subarray in an Array",
        "url": "https://leetcode.com/problems/maximum-product-subarray/"
      }
    ]
  },
  {
    "name": "Binary Search [1D, 2D Arrays, Search Space]",
    "questions": [
      {
        "title": "Search X in sorted array",
        "url": "https://leetcode.com/problems/binary-search/"
      },
      {
        "title": "Lower Bound ",
        "url": "https://takeuforward.org/arrays/implement-lower-bound-bs-2/"
      },
      {
        "title": "Upper Bound",
        "url": "https://takeuforward.org/arrays/implement-upper-bound/"
      },
      {
        "title": "Search insert position",
        "url": "https://leetcode.com/problems/search-insert-position/#:~:text=Search%20Insert%20Position%20%2D%20LeetCode\\u0026text=Given%20a%20sorted%20array%20of,(log%20n)%20runtime%20complexity."
      },
      {
        "title": "Floor and Ceil in Sorted Array",
        "url": "https://takeuforward.org/arrays/floor-and-ceil-in-sorted-array/"
      },
      {
        "title": "First and last occurrence",
        "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
      },
      {
        "title": "Count Occurrences in a Sorted Array",
        "url": "https://takeuforward.org/data-structure/count-occurrences-in-sorted-array/"
      },
      {
        "title": "Search in rotated sorted array-I",
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
      },
      {
        "title": "Search in rotated sorted array-II",
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/"
      },
      {
        "title": "Find minimum in Rotated Sorted Array",
        "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
      },
      {
        "title": "Find out how many times the array is rotated",
        "url": "https://takeuforward.org/arrays/find-out-how-many-times-the-array-has-been-rotated/"
      },
      {
        "title": "Single element in a Sorted Array",
        "url": "https://leetcode.com/problems/single-element-in-a-sorted-array/"
      },
      {
        "title": "Find peak element",
        "url": "https://leetcode.com/problems/find-peak-element/#:~:text=Find%20Peak%20Element%20%2D%20LeetCode\\u0026text=A%20peak%20element%20is%20an,to%20any%20of%20the%20peaks."
      },
      {
        "title": "Find square root of a number",
        "url": "https://takeuforward.org/binary-search/finding-sqrt-of-a-number-using-binary-search/"
      },
      {
        "title": "Find Nth root of a number",
        "url": "https://takeuforward.org/data-structure/nth-root-of-a-number-using-binary-search/"
      },
      {
        "title": "Koko eating bananas",
        "url": "https://leetcode.com/problems/koko-eating-bananas/"
      },
      {
        "title": "Minimum days to make M bouquets",
        "url": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/"
      },
      {
        "title": "Find the smallest divisor",
        "url": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/"
      },
      {
        "title": "Capacity to Ship Packages Within D Days",
        "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"
      },
      {
        "title": "Kth Missing Positive Number",
        "url": "https://leetcode.com/problems/kth-missing-positive-number/#:~:text=Given%20an%20array%20arr%20of,13%2C...%5D."
      },
      {
        "title": "Aggressive Cows",
        "url": "https://takeuforward.org/data-structure/aggressive-cows-detailed-solution/"
      },
      {
        "title": "Book Allocation Problem",
        "url": "https://takeuforward.org/data-structure/allocate-minimum-number-of-pages/"
      },
      {
        "title": "Split array - largest sum",
        "url": "https://leetcode.com/problems/split-array-largest-sum/"
      },
      {
        "title": "Painter's Partition",
        "url": "https://takeuforward.org/arrays/painters-partition-problem/"
      },
      {
        "title": "Minimize Max Distance to Gas Station",
        "url": "https://leetcode.com/problems/minimize-max-distance-to-gas-station/"
      },
      {
        "title": "Median of 2 sorted arrays",
        "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
      },
      {
        "title": "Kth element of 2 sorted arrays",
        "url": "https://takeuforward.org/data-structure/k-th-element-of-two-sorted-arrays/"
      },
      {
        "title": "Find row with maximum 1's",
        "url": "https://takeuforward.org/arrays/find-the-row-with-maximum-number-of-1s/"
      },
      {
        "title": "Search in a 2D matrix",
        "url": "https://leetcode.com/problems/search-a-2d-matrix/"
      },
      {
        "title": "Search in 2D matrix - II",
        "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/"
      },
      {
        "title": "Find Peak Element - II",
        "url": "https://leetcode.com/problems/find-a-peak-element-ii/"
      },
      {
        "title": "Matrix Median",
        "url": "https://takeuforward.org/data-structure/median-of-row-wise-sorted-matrix/"
      }
    ]
  },
  {
    "name": "Strings [Basic and Medium]",
    "questions": [
      {
        "title": "Remove Outermost Parentheses",
        "url": "https://leetcode.com/problems/remove-outermost-parentheses/"
      },
      {
        "title": "Reverse words in a given string / Palindrome Check",
        "url": "https://leetcode.com/problems/reverse-words-in-a-string/"
      },
      {
        "title": "Largest Odd Number in a String",
        "url": "https://leetcode.com/problems/largest-odd-number-in-string/"
      },
      {
        "title": "Longest Common Prefix",
        "url": "https://leetcode.com/problems/longest-common-prefix/"
      },
      {
        "title": "Isomorphic String",
        "url": "https://leetcode.com/problems/isomorphic-strings/"
      },
      {
        "title": "Rotate String",
        "url": "https://leetcode.com/problems/rotate-string/"
      },
      {
        "title": "Check if two strings are anagram of each other",
        "url": "https://leetcode.com/problems/valid-anagram/#:~:text=Given%20two%20strings%20s%20and,the%20original%20letters%20exactly%20once.\\u0026text=Constraints%3A,.length%20%3C%3D%205%20*%2010"
      },
      {
        "title": "Sort Characters by Frequency",
        "url": "https://leetcode.com/problems/sort-characters-by-frequency/"
      },
      {
        "title": "Maximum Nesting Depth of the Parentheses",
        "url": "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/"
      },
      {
        "title": "Roman to Integer",
        "url": "https://leetcode.com/problems/roman-to-integer/"
      },
      {
        "title": "String to Integer (atoi)",
        "url": "https://leetcode.com/problems/string-to-integer-atoi/"
      },
      {
        "title": "Count Number of Substrings",
        "url": "https://takeuforward.org/data-structure/count-number-of-substrings"
      },
      {
        "title": "Longest Palindromic Substring",
        "url": "https://leetcode.com/problems/longest-palindromic-substring/"
      },
      {
        "title": "Sum of Beauty of All Substrings",
        "url": "https://leetcode.com/problems/sum-of-beauty-of-all-substrings/"
      },
      {
        "title": "Reverse every word in a string",
        "url": "https://leetcode.com/problems/reverse-words-in-a-string/"
      }
    ]
  },
  {
    "name": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]",
    "questions": [
      {
        "title": "Introduction to Singly LinkedList",
        "url": "https://takeuforward.org/linked-list/linked-list-introduction"
      },
      {
        "title": "Insertion at the head of Linked List",
        "url": "https://takeuforward.org/linked-list/insert-at-the-head-of-a-linked-list"
      },
      {
        "title": "Deletion of the head of LL",
        "url": "https://leetcode.com/problems/delete-node-in-a-linked-list/"
      },
      {
        "title": "Find the length of the Linked List",
        "url": "https://takeuforward.org/linked-list/find-the-length-of-a-linked-list"
      },
      {
        "title": "Search in Linked List",
        "url": "https://takeuforward.org/linked-list/search-an-element-in-a-linked-list"
      },
      {
        "title": "Introduction to Doubly LL",
        "url": "https://takeuforward.org/linked-list/introduction-to-doubly-linked-list"
      },
      {
        "title": "Insert node before head in Doubly Linked List",
        "url": "https://takeuforward.org/data-structure/insert-at-end-of-doubly-linked-list/"
      },
      {
        "title": "Delete head of Doubly Linked List",
        "url": "https://takeuforward.org/data-structure/delete-last-node-of-a-doubly-linked-list/"
      },
      {
        "title": "Reverse a Doubly Linked List",
        "url": "https://takeuforward.org/data-structure/reverse-a-doubly-linked-list/"
      },
      {
        "title": "Middle of a LinkedList [TortoiseHare Method]",
        "url": "https://leetcode.com/problems/middle-of-the-linked-list/"
      },
      {
        "title": "Reverse a LinkedList [Iterative]",
        "url": "https://leetcode.com/problems/reverse-linked-list/"
      },
      {
        "title": "Reverse a LL",
        "url": "https://leetcode.com/problems/reverse-linked-list/"
      },
      {
        "title": "Detect a loop in LL",
        "url": "https://leetcode.com/problems/linked-list-cycle/"
      },
      {
        "title": "Find the starting point in LL",
        "url": "https://leetcode.com/problems/linked-list-cycle-ii/"
      },
      {
        "title": "Length of loop in LL",
        "url": "https://takeuforward.org/linked-list/length-of-loop-in-linked-list"
      },
      {
        "title": "Check if LL is palindrome or not",
        "url": "https://leetcode.com/problems/palindrome-linked-list/"
      },
      {
        "title": "Segregate odd and even nodes in Linked List",
        "url": "https://leetcode.com/problems/odd-even-linked-list/"
      },
      {
        "title": "Remove Nth node from the back of the LL",
        "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
      },
      {
        "title": "Delete the middle node in LL",
        "url": "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/#:~:text=You%20are%20given%20the%20head,than%20or%20equal%20to%20x%20."
      },
      {
        "title": "Sort LL",
        "url": "https://leetcode.com/problems/sort-list/"
      },
      {
        "title": "Sort a Linked List of 0's 1's and 2's",
        "url": "https://takeuforward.org/data-structure/sort-a-linked-list-of-0s-1s-and-2s-by-changing-links"
      },
      {
        "title": "Find the intersection point of Y LL",
        "url": "https://leetcode.com/problems/intersection-of-two-linked-lists/"
      },
      {
        "title": "Add one to a number represented by LL",
        "url": "https://takeuforward.org/data-structure/add-1-to-a-number-represented-by-ll"
      },
      {
        "title": "Add two numbers in Linked List",
        "url": "https://leetcode.com/problems/add-two-numbers/"
      },
      {
        "title": "Delete all occurrences of a key in DLL",
        "url": "Delete all occurrences of a key in DLL"
      },
      {
        "title": "Find Pairs with Given Sum in Doubly Linked List",
        "url": "https://takeuforward.org/data-structure/find-pairs-with-given-sum-in-doubly-linked-list"
      },
      {
        "title": "Remove duplicates from sorted DLL",
        "url": "https://takeuforward.org/data-structure/remove-duplicates-from-sorted-dll"
      },
      {
        "title": "Reverse LL in group of given size K",
        "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/"
      },
      {
        "title": "Rotate a LL",
        "url": "https://leetcode.com/problems/rotate-list/description/"
      },
      {
        "title": "Flattening of LL",
        "url": "https://takeuforward.org/data-structure/flattening-a-linked-list/"
      },
      {
        "title": "Clone a LL with random and next pointer",
        "url": "https://leetcode.com/problems/copy-list-with-random-pointer/"
      }
    ]
  },
  {
    "name": "Recursion [PatternWise]",
    "questions": [
      {
        "title": "Recursive Implementation of atoi()",
        "url": "https://leetcode.com/problems/string-to-integer-atoi/"
      },
      {
        "title": "Pow(x, n)",
        "url": "https://leetcode.com/problems/powx-n/"
      },
      {
        "title": "Count Good Numbers",
        "url": "https://leetcode.com/problems/count-good-numbers/"
      },
      {
        "title": "Sort a stack using recursion",
        "url": "https://takeuforward.org/data-structure/sort-a-stack"
      },
      {
        "title": "Reverse a Stack",
        "url": "https://takeuforward.org/data-structure/reverse-a-stack-using-recursion"
      },
      {
        "title": "Generate Binary Strings Without Consecutive 1s",
        "url": "https://takeuforward.org/data-structure/generate-all-binary-strings"
      },
      {
        "title": "Generate Parentheses",
        "url": "https://leetcode.com/problems/generate-parentheses/"
      },
      {
        "title": "Power Set",
        "url": "https://takeuforward.org/data-structure/power-set-print-all-the-possible-subsequences-of-the-string/"
      },
      {
        "title": "Learn All Patterns of Subsequences (Theory)",
        "url": "https://takeuforward.org/data-structure/learn-all-patterns-of-subsequences-theory"
      },
      {
        "title": "Count all subsequences with sum K",
        "url": "https://takeuforward.org/data-structure/count-all-subsequences-with-sum-k"
      },
      {
        "title": "Check if there exists a subsequence with sum K",
        "url": "https://takeuforward.org/data-structure/check-if-there-exists-a-subsequence-with-sum-k"
      },
      {
        "title": "Combination Sum",
        "url": "https://leetcode.com/problems/combination-sum/"
      },
      {
        "title": "Combination Sum II",
        "url": "https://leetcode.com/problems/combination-sum-ii/"
      },
      {
        "title": "Subsets I",
        "url": "https://takeuforward.org/data-structure/subset-sum-sum-of-all-subsets/"
      },
      {
        "title": "Subsets II",
        "url": "https://leetcode.com/problems/subsets-ii/"
      },
      {
        "title": "Combination Sum III",
        "url": "https://leetcode.com/problems/combination-sum-iii/"
      },
      {
        "title": "Letter Combinations of a Phone Number",
        "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
      },
      {
        "title": "Palindrome partitioning",
        "url": ""
      },
      {
        "title": "Word Search",
        "url": "https://leetcode.com/problems/word-search/"
      },
      {
        "title": "N Queen",
        "url": "https://leetcode.com/problems/n-queens/"
      },
      {
        "title": "Rat in a Maze",
        "url": "https://takeuforward.org/data-structure/rat-in-a-maze/"
      },
      {
        "title": "Word Break",
        "url": ""
      },
      {
        "title": "M Coloring Problem",
        "url": "https://takeuforward.org/data-structure/m-coloring-problem/"
      },
      {
        "title": "Sudoku Solver",
        "url": "https://leetcode.com/problems/sudoku-solver/"
      },
      {
        "title": "Expression Add Operators",
        "url": "https://leetcode.com/problems/expression-add-operators/"
      }
    ]
  },
  {
    "name": "Bit Manipulation [Concepts \\u0026 Problems]",
    "questions": [
      {
        "title": "Introduction to Bits and Tricks",
        "url": "https://takeuforward.org/data-structure/introduction-to-bit-manipulation-theory"
      },
      {
        "title": "Check if the i-th bit is Set or Not",
        "url": "https://takeuforward.org/data-structure/check-if-the-i-th-bit-is-set-or-not"
      },
      {
        "title": "Check if a Number is Odd or Not",
        "url": "https://takeuforward.org/data-structure/check-if-a-number-is-odd-or-not"
      },
      {
        "title": "Check if a Number is Power of 2 or Not",
        "url": "https://leetcode.com/problems/power-of-two/"
      },
      {
        "title": "Count the Number of Set Bits",
        "url": "https://takeuforward.org/data-structure/count-the-number-of-set-bits"
      },
      {
        "title": "Set/Unset the rightmost unset bit",
        "url": "https://takeuforward.org/data-structure/set-the-rightmost-bit"
      },
      {
        "title": "Swap Two Numbers",
        "url": "https://takeuforward.org/data-structure/swap-two-numbers"
      },
      {
        "title": "Divide two numbers without multiplication and division",
        "url": "https://leetcode.com/problems/divide-two-integers/"
      },
      {
        "title": "Minimum Bit Flips to Convert Number",
        "url": "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/"
      },
      {
        "title": "Single Number - I",
        "url": "https://leetcode.com/problems/single-number/"
      },
      {
        "title": "Power Set Bit Manipulation",
        "url": "https://leetcode.com/problems/subsets/"
      },
      {
        "title": "XOR of numbers in a given range",
        "url": "https://takeuforward.org/data-structure/find-xor-of-numbers-from-l-to-r"
      },
      {
        "title": "Single Number - III",
        "url": "https://takeuforward.org/data-structure/find-the-two-numbers-appearing-odd-number-of-times"
      },
      {
        "title": "Print Prime Factors of a Number",
        "url": "https://takeuforward.org/data-structure/find-the-two-numbers-appearing-odd-number-of-times"
      },
      {
        "title": "Divisors of a Number",
        "url": "https://takeuforward.org/data-structure/print-all-divisors-of-a-given-number/"
      },
      {
        "title": "Count primes in range L to R",
        "url": "https://leetcode.com/problems/count-primes/"
      },
      {
        "title": "Prime factorisation of a Number",
        "url": "https://takeuforward.org/data-structure/find-the-two-numbers-appearing-odd-number-of-times"
      },
      {
        "title": "Pow(x,n)",
        "url": "https://leetcode.com/problems/powx-n/"
      }
    ]
  },
  {
    "name": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]",
    "questions": [
      {
        "title": "Implement Stack using Arrays",
        "url": "https://takeuforward.org/data-structure/implement-stack-using-array/"
      },
      {
        "title": "Implement Queue using Arrays",
        "url": "https://takeuforward.org/data-structure/implement-queue-using-array/"
      },
      {
        "title": "Implement Stack using Queue",
        "url": "https://leetcode.com/problems/implement-stack-using-queues/"
      },
      {
        "title": "Implement Queue using Stack",
        "url": "https://leetcode.com/problems/implement-queue-using-stacks/"
      },
      {
        "title": "Implement stack using Linkedlist",
        "url": "https://takeuforward.org/data-structure/implement-stack-using-linked-list/"
      },
      {
        "title": "Implement queue using Linkedlist",
        "url": "https://takeuforward.org/data-structure/implement-queue-using-linked-list/"
      },
      {
        "title": "Balanced Paranthesis",
        "url": "https://leetcode.com/problems/valid-parentheses/"
      },
      {
        "title": "Implement Min Stack",
        "url": "https://leetcode.com/problems/min-stack/"
      },
      {
        "title": "Infix to Postfix Conversion",
        "url": "https://takeuforward.org/data-structure/infix-to-postfix/"
      },
      {
        "title": "Prefix to Infix Conversion",
        "url": "https://takeuforward.org/data-structure/prefix-to-infix-conversion"
      },
      {
        "title": "Prefix to Postfix Conversion",
        "url": "https://takeuforward.org/data-structure/prefix-to-postfix-conversion"
      },
      {
        "title": "Postfix to Prefix Conversion",
        "url": "https://takeuforward.org/data-structure/postfix-to-prefix-conversion"
      },
      {
        "title": "Postfix to Infix Conversion",
        "url": "https://takeuforward.org/data-structure/postfix-to-infix"
      },
      {
        "title": "Infix to Prefix Conversion",
        "url": "https://takeuforward.org/data-structure/infix-to-prefix/"
      },
      {
        "title": "Next Greater Element",
        "url": "https://leetcode.com/problems/next-greater-element-i/"
      },
      {
        "title": "Next Greater Element - 2",
        "url": "https://leetcode.com/problems/next-greater-element-ii/"
      },
      {
        "title": "Next Smaller Element",
        "url": "https://takeuforward.org/data-structure/next-smaller-element"
      },
      {
        "title": "Number of Greater Elements to the Right",
        "url": "https://takeuforward.org/data-structure/number-of-nges-to-the-right"
      },
      {
        "title": "Trapping Rainwater",
        "url": "https://leetcode.com/problems/trapping-rain-water/"
      },
      {
        "title": "Sum of Subarray Minimums",
        "url": "https://leetcode.com/problems/sum-of-subarray-minimums/"
      },
      {
        "title": "Asteroid Collision",
        "url": "https://leetcode.com/problems/asteroid-collision/"
      },
      {
        "title": "Sum of Subarray Ranges",
        "url": "https://leetcode.com/problems/sum-of-subarray-ranges/"
      },
      {
        "title": "Remove K Digits",
        "url": "https://leetcode.com/problems/remove-k-digits/"
      },
      {
        "title": "Largest rectangle in a histogram",
        "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
      },
      {
        "title": "Maximum Rectangles",
        "url": "https://leetcode.com/problems/maximal-rectangle/"
      },
      {
        "title": "Sliding Window Maximum",
        "url": "https://leetcode.com/problems/sliding-window-maximum/"
      },
      {
        "title": "Stock span problem",
        "url": "https://leetcode.com/problems/online-stock-span/"
      },
      {
        "title": "Celebrity Problem",
        "url": "https://leetcode.com/accounts/login/?next=/problems/find-the-celebrity/"
      },
      {
        "title": "LRU Cache",
        "url": "https://takeuforward.org/data-structure/program-for-least-recently-used-lru-page-replacement-algorithm"
      },
      {
        "title": "LFU Cache",
        "url": "https://leetcode.com/problems/lfu-cache/"
      }
    ]
  },
  {
    "name": "Sliding Window \\u0026 Two Pointer Combined Problems",
    "questions": [
      {
        "title": "Longest Substring Without Repeating Characters",
        "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
      },
      {
        "title": " Max Consecutive Ones III",
        "url": "https://leetcode.com/problems/max-consecutive-ones-iii/"
      },
      {
        "title": " Fruit Into Baskets",
        "url": "https://takeuforward.org/data-structure/fruit-into-baskets"
      },
      {
        "title": "Longest Repeating Character Replacement",
        "url": "https://leetcode.com/problems/longest-repeating-character-replacement/"
      },
      {
        "title": "Binary Subarrays With Sum",
        "url": "https://leetcode.com/problems/binary-subarrays-with-sum/"
      },
      {
        "title": "Count number of Nice subarrays",
        "url": "https://leetcode.com/problems/count-number-of-nice-subarrays/"
      },
      {
        "title": "Number of Substrings Containing All Three Characters",
        "url": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/"
      },
      {
        "title": "Maximum Points You Can Obtain from Cards ",
        "url": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/"
      },
      {
        "title": "Longest Substring With At Most K Distinct Characters",
        "url": "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/"
      },
      {
        "title": "Subarrays with K Different Integers",
        "url": "https://leetcode.com/problems/subarrays-with-k-different-integers/"
      },
      {
        "title": "Minimum Window Substring ",
        "url": "https://leetcode.com/problems/minimum-window-substring/"
      },
      {
        "title": "Minimum Window Subsequence",
        "url": "https://leetcode.com/problems/minimum-window-subsequence/"
      }
    ]
  },
  {
    "name": "Heaps [Learning, Medium, Hard Problems]",
    "questions": [
      {
        "title": "Heaps (Theory Video)",
        "url": "https://takeuforward.org/data-structure/introduction-to-priority-queues-using-binary-heaps"
      },
      {
        "title": "Implement Min Heap",
        "url": ""
      },
      {
        "title": "Check if an array represents a min heap ",
        "url": "https://takeuforward.org/data-structure/check-if-an-array-represents-a-min-heap"
      },
      {
        "title": "Convert Min Heap to Max Heap",
        "url": ""
      },
      {
        "title": "K-th Largest element in an array",
        "url": "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-an-array/"
      },
      {
        "title": "Kth smallest element in an array [use priority queue]",
        "url": "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-an-array/"
      },
      {
        "title": "Sort K sorted array",
        "url": "https://takeuforward.org/data-structure/sort-k-sorted-array"
      },
      {
        "title": "Merge K sorted Lists",
        "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
      },
      {
        "title": "Replace Elements by Their Rank",
        "url": "https://takeuforward.org/data-structure/replace-elements-by-its-rank-in-the-array/"
      },
      {
        "title": "Task Scheduler",
        "url": "https://leetcode.com/problems/task-scheduler/"
      },
      {
        "title": "Hand of Straights",
        "url": "https://leetcode.com/problems/hand-of-straights/"
      },
      {
        "title": "Design Twitter",
        "url": "https://leetcode.com/problems/design-twitter/"
      },
      {
        "title": "Minimum Cost to Connect Sticks",
        "url": "https://takeuforward.org/data-structure/minimum-cost-to-connect-sticks"
      },
      {
        "title": "Kth largest element in a stream of running integers",
        "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/#:~:text=Implement%20KthLargest%20class%3A,largest%20element%20in%20the%20stream."
      },
      {
        "title": "Maximum Sum Combination",
        "url": "https://takeuforward.org/data-structure/maximum-sum-combination"
      },
      {
        "title": "Find Median from Data Stream",
        "url": "https://leetcode.com/problems/find-median-from-data-stream/"
      },
      {
        "title": "Top K Frequent Elements",
        "url": "https://leetcode.com/problems/top-k-frequent-elements/"
      }
    ]
  },
  {
    "name": "Greedy Algorithms [Easy, Medium/Hard]",
    "questions": [
      {
        "title": "Assign Cookies",
        "url": "https://leetcode.com/problems/assign-cookies/"
      },
      {
        "title": "Fractional Knapsack",
        "url": "https://takeuforward.org/data-structure/fractional-knapsack-problem-greedy-approach/"
      },
      {
        "title": "Lemonade Change",
        "url": "https://leetcode.com/problems/lemonade-change/"
      },
      {
        "title": "Valid Paranthesis Checker",
        "url": "https://leetcode.com/problems/valid-parenthesis-string/"
      },
      {
        "title": "N meetings in one room",
        "url": "https://takeuforward.org/data-structure/n-meetings-in-one-room/"
      },
      {
        "title": "Jump Game - I",
        "url": "https://leetcode.com/problems/jump-game/"
      },
      {
        "title": "Jump Game II",
        "url": "https://leetcode.com/problems/jump-game-ii/"
      },
      {
        "title": "Minimum number of platforms required for a railway",
        "url": "https://takeuforward.org/data-structure/minimum-number-of-platforms-required-for-a-railway/"
      },
      {
        "title": "Job sequencing Problem",
        "url": "https://takeuforward.org/data-structure/job-sequencing-problem/"
      },
      {
        "title": "Candy",
        "url": "https://leetcode.com/problems/candy/"
      },
      {
        "title": "Shortest Job First",
        "url": "https://takeuforward.org/Greedy/shortest-job-first-or-sjf-cpu-scheduling"
      },
      {
        "title": "Program for Least Recently Used (LRU) Page Replacement Algorithm",
        "url": "https://takeuforward.org/data-structure/program-for-least-recently-used-lru-page-replacement-algorithm"
      },
      {
        "title": "Insert Interval",
        "url": "https://leetcode.com/problems/insert-interval/"
      },
      {
        "title": "Merge Intervals",
        "url": "https://leetcode.com/problems/merge-intervals/"
      },
      {
        "title": "Non-overlapping Intervals",
        "url": "https://leetcode.com/problems/non-overlapping-intervals/"
      }
    ]
  },
  {
    "name": "Binary Trees [Traversals, Medium and Hard Problems]",
    "questions": [
      {
        "title": "Introduction to Trees",
        "url": "https://takeuforward.org/binary-tree/introduction-to-trees/"
      },
      {
        "title": "Binary Tree Representation in Java",
        "url": "https://takeuforward.org/binary-tree/binary-tree-representation-in-java/"
      },
      {
        "title": "Pre, Post, Inorder in one traversal",
        "url": "https://takeuforward.org/data-structure/preorder-inorder-postorder-traversals-in-one-traversal/"
      },
      {
        "title": "Preorder Traversal",
        "url": "https://leetcode.com/problems/binary-tree-preorder-traversal/"
      },
      {
        "title": "Inorder Traversal of Binary Tree",
        "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/"
      },
      {
        "title": "Postorder Traversal",
        "url": "https://leetcode.com/problems/binary-tree-postorder-traversal/"
      },
      {
        "title": "Level Order Traversal",
        "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
      },
      {
        "title": "Iterative Preorder Traversal of Binary Tree",
        "url": "https://leetcode.com/problems/binary-tree-preorder-traversal/"
      },
      {
        "title": "Iterative Inorder Traversal of Binary Tree",
        "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/"
      },
      {
        "title": "Post-order Traversal of Binary Tree using 2 stack",
        "url": "https://leetcode.com/problems/binary-tree-postorder-traversal/"
      },
      {
        "title": "Post-order Traversal of Binary Tree using 1 stack",
        "url": "https://leetcode.com/problems/binary-tree-postorder-traversal/"
      },
      {
        "title": "Preorder, Inorder, and Postorder Traversal in one Traversal",
        "url": "https://takeuforward.org/data-structure/preorder-inorder-postorder-traversals-in-one-traversal/"
      },
      {
        "title": "Maximum Depth in BT",
        "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
      },
      {
        "title": "Check for balanced binary tree",
        "url": "https://leetcode.com/problems/balanced-binary-tree/"
      },
      {
        "title": "Diameter of Binary Tree",
        "url": "https://leetcode.com/problems/diameter-of-binary-tree/"
      },
      {
        "title": "Maximum path sum ",
        "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
      },
      {
        "title": "Check if two trees are identical or not",
        "url": "https://leetcode.com/problems/same-tree/"
      },
      {
        "title": "Zig Zag or Spiral Traversal",
        "url": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/"
      },
      {
        "title": "Boundary Traversal",
        "url": "https://leetcode.com/problems/boundary-of-binary-tree/"
      },
      {
        "title": "Vertical Order Traversal",
        "url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/"
      },
      {
        "title": "Top View of BT",
        "url": "https://takeuforward.org/data-structure/top-view-of-a-binary-tree/"
      },
      {
        "title": "Bottom view of BT",
        "url": "https://takeuforward.org/data-structure/bottom-view-of-a-binary-tree/"
      },
      {
        "title": "Right/Left View of Binary Tree",
        "url": "https://leetcode.com/problems/binary-tree-right-side-view/"
      },
      {
        "title": "Symmetric Binary Tree",
        "url": "https://leetcode.com/problems/symmetric-tree/"
      },
      {
        "title": "Print root to leaf path in BT",
        "url": "https://takeuforward.org/data-structure/print-root-to-node-path-in-a-binary-tree/"
      },
      {
        "title": "LCA in BT",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
      },
      {
        "title": "Maximum Width of BT",
        "url": "https://leetcode.com/problems/maximum-width-of-binary-tree/"
      },
      {
        "title": "Children Sum Property in Binary Tree",
        "url": "https://takeuforward.org/data-structure/check-for-children-sum-property-in-a-binary-tree/"
      },
      {
        "title": "Print all nodes at a distance of K in BT",
        "url": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/"
      },
      {
        "title": "Minimum time taken to burn the BT from a given Node",
        "url": "https://takeuforward.org/data-structure/minimum-time-taken-to-burn-the-binary-tree-from-a-node"
      },
      {
        "title": "Count total nodes in a complete BT",
        "url": "https://leetcode.com/problems/count-complete-tree-nodes/"
      },
      {
        "title": "Requirements needed to construct a unique BT",
        "url": ""
      },
      {
        "title": "Construct a BT from Preorder and Inorder",
        "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
      },
      {
        "title": "Construct the Binary Tree from Postorder and Inorder Traversal",
        "url": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/"
      },
      {
        "title": "Serialize and De-serialize BT",
        "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
      },
      {
        "title": "Morris Preorder Traversal of a Binary Tree",
        "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/"
      },
      {
        "title": "Morris Inorder Traversal of a Binary Tree",
        "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/"
      },
      {
        "title": "Flatten Binary Tree to Linked List",
        "url": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/"
      }
    ]
  },
  {
    "name": "Binary Search Trees [Concept and Problems]",
    "questions": [
      {
        "title": "Introduction to BST",
        "url": "https://takeuforward.org/binary-search-tree/introduction-to-binary-search-trees/"
      },
      {
        "title": "Search in a Binary Search Tree",
        "url": "https://leetcode.com/problems/search-in-a-binary-search-tree/"
      },
      {
        "title": "Find Min/Max in BST",
        "url": "https://takeuforward.org/data-structure/find-minmax-in-a-bst"
      },
      {
        "title": "Floor and Ceil in a BST",
        "url": ""
      },
      {
        "title": "Floor in a Binary Search Tree",
        "url": "https://takeuforward.org/binary-search-tree/floor-in-a-binary-search-tree/"
      },
      {
        "title": "Insert a given node in BST",
        "url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/"
      },
      {
        "title": "Delete a node in BST",
        "url": "https://leetcode.com/problems/delete-node-in-a-bst/"
      },
      {
        "title": "Kth Smallest and Largest element in BST",
        "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
      },
      {
        "title": "Check if a tree is a BST or not",
        "url": "https://leetcode.com/problems/validate-binary-search-tree/"
      },
      {
        "title": "LCA in BST",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
      },
      {
        "title": "Construct a BST from a preorder traversal",
        "url": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/"
      },
      {
        "title": "Inorder Successor/Predecessor in BST",
        "url": "https://leetcode.com/problems/inorder-successor-in-bst/"
      },
      {
        "title": "Merge 2 BST's",
        "url": "https://leetcode.com/problems/binary-search-tree-iterator/"
      },
      {
        "title": "Two Sum In BST | Check if there exists a pair with Sum K",
        "url": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/"
      },
      {
        "title": "Correct BST with two nodes swapped",
        "url": "https://leetcode.com/problems/recover-binary-search-tree/"
      },
      {
        "title": "Largest BST in Binary Tree",
        "url": "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/"
      }
    ]
  },
  {
    "name": "Graphs [Concepts \\u0026 Problems]",
    "questions": [
      {
        "title": "Introduction to Graph",
        "url": "https://takeuforward.org/data-structure/graph-representation-in-java"
      },
      {
        "title": "Graph Representation | C++",
        "url": "https://takeuforward.org/graph/graph-representation-in-c/"
      },
      {
        "title": "Graph Representation | Java",
        "url": "https://takeuforward.org/data-structure/graph-representation-in-java"
      },
      {
        "title": "Connected Components",
        "url": "https://takeuforward.org/data-structure/connected-components"
      },
      {
        "title": "Traversal Techniques",
        "url": "https://takeuforward.org/data-structure/depth-first-search-dfs/"
      },
      {
        "title": "DFS",
        "url": "https://takeuforward.org/data-structure/depth-first-search-dfs/"
      },
      {
        "title": "Number of provinces",
        "url": "https://leetcode.com/problems/number-of-provinces/#:~:text=A%20province%20is%20a%20group,the%20total%20number%20of%20provinces."
      },
      {
        "title": "Connected Components Problem in Matrix",
        "url": "https://takeuforward.org/data-structure/connected-components"
      },
      {
        "title": "Rotten Oranges",
        "url": "https://leetcode.com/problems/rotting-oranges/"
      },
      {
        "title": "Flood fill algorithm",
        "url": "https://leetcode.com/problems/flood-fill/"
      },
      {
        "title": "Cycle Detection in Undirected Graph (bfs)",
        "url": "https://takeuforward.org/data-structure/detect-cycle-in-an-undirected-graph-using-bfs/"
      },
      {
        "title": "Detect a cycle in an undirected graph",
        "url": "https://leetcode.com/problems/course-schedule/"
      },
      {
        "title": "Distance of nearest cell having one",
        "url": "https://leetcode.com/problems/01-matrix/"
      },
      {
        "title": "Surrounded Regions",
        "url": "https://leetcode.com/problems/surrounded-regions/"
      },
      {
        "title": "Number of enclaves",
        "url": "https://leetcode.com/problems/number-of-enclaves/"
      },
      {
        "title": "Word ladder I",
        "url": "https://leetcode.com/problems/word-ladder/"
      },
      {
        "title": "Word ladder II",
        "url": "https://leetcode.com/problems/word-ladder-ii/"
      },
      {
        "title": "Number of islands",
        "url": "https://leetcode.com/problems/number-of-islands/"
      },
      {
        "title": "Bipartite Graph (DFS)",
        "url": "https://leetcode.com/problems/is-graph-bipartite/"
      },
      {
        "title": "Cycle Detection in Directed Graph (DFS)",
        "url": "https://leetcode.com/problems/course-schedule-ii/discuss/293048/detecting-cycle-in-directed-graph-problem"
      },
      {
        "title": "Topo Sort",
        "url": "https://takeuforward.org/data-structure/topological-sort-algorithm-dfs-g-21/"
      },
      {
        "title": "Topological sort or Kahn's algorithm",
        "url": "https://takeuforward.org/data-structure/topological-sort-algorithm-dfs-g-21/"
      },
      {
        "title": "Detect a cycle in a directed graph",
        "url": "https://leetcode.com/problems/course-schedule/"
      },
      {
        "title": "Course Schedule I",
        "url": "https://leetcode.com/problems/course-schedule/"
      },
      {
        "title": "Course Schedule II",
        "url": "https://leetcode.com/problems/course-schedule-ii/"
      },
      {
        "title": "Find eventual safe states",
        "url": "https://leetcode.com/problems/find-eventual-safe-states/"
      },
      {
        "title": "Alien Dictionary",
        "url": "https://leetcode.com/problems/alien-dictionary/solution/"
      },
      {
        "title": "Shortest path in undirected graph with unit weights",
        "url": "https://takeuforward.org/data-structure/shortest-path-in-undirected-graph-with-unit-distance-g-28/"
      },
      {
        "title": "Shortest path in DAG",
        "url": "https://takeuforward.org/data-structure/shortest-path-in-directed-acyclic-graph-topological-sort-g-27/"
      },
      {
        "title": "Djisktra's Algorithm",
        "url": "https://takeuforward.org/data-structure/dijkstras-algorithm-using-set-g-33/"
      },
      {
        "title": "Why priority Queue is used in Djisktra's Algorithm",
        "url": "https://takeuforward.org/data-structure/dijkstras-algorithm-using-priority-queue-g-32/"
      },
      {
        "title": "Shortest Distance in a Binary Maze",
        "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
      },
      {
        "title": "Path with minimum effort",
        "url": "https://leetcode.com/problems/path-with-minimum-effort/"
      },
      {
        "title": "Cheapest flight within K stops",
        "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
      },
      {
        "title": "Network Delay Time",
        "url": "https://leetcode.com/problems/network-delay-time/"
      },
      {
        "title": "Number of ways to arrive at destination",
        "url": "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/"
      },
      {
        "title": "Minimum multiplications to reach end",
        "url": "https://takeuforward.org/graph/g-39-minimum-multiplications-to-reach-end/"
      },
      {
        "title": "Bellman Ford Algorithm",
        "url": "https://takeuforward.org/data-structure/bellman-ford-algorithm-g-41/"
      },
      {
        "title": "Floyd warshall algorithm",
        "url": "https://takeuforward.org/data-structure/floyd-warshall-algorithm-g-42/"
      },
      {
        "title": "Find the city with the smallest number of neighbors",
        "url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/"
      },
      {
        "title": "MST theory",
        "url": "https://takeuforward.org/data-structure/minimum-spanning-tree-theory-g-44/"
      },
      {
        "title": "Prim's Algorithm",
        "url": "https://takeuforward.org/data-structure/prims-algorithm-minimum-spanning-tree-c-and-java-g-45/"
      },
      {
        "title": "Disjoint Set ",
        "url": "https://takeuforward.org/data-structure/disjoint-set-union-by-rank-union-by-size-path-compression-g-46/"
      },
      {
        "title": "Find the MST weight",
        "url": "https://takeuforward.org/data-structure/prims-algorithm-minimum-spanning-tree-c-and-java-g-45/"
      },
      {
        "title": "Number of operations to make network connected",
        "url": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/"
      },
      {
        "title": "Most stones removed with same row or column",
        "url": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/"
      },
      {
        "title": "Accounts merge",
        "url": "https://leetcode.com/problems/accounts-merge/"
      },
      {
        "title": "Number of islands II",
        "url": "https://leetcode.com/problems/number-of-islands-ii/"
      },
      {
        "title": "Making a large island",
        "url": "https://leetcode.com/problems/making-a-large-island/"
      },
      {
        "title": "Swim in Rising Water",
        "url": "https://leetcode.com/problems/swim-in-rising-water/"
      },
      {
        "title": "Bridges in graph",
        "url": "https://leetcode.com/problems/critical-connections-in-a-network/discuss/382385/find-bridges-in-a-graph"
      },
      {
        "title": "Articulation point in graph",
        "url": "https://takeuforward.org/data-structure/articulation-point-in-graph-g-56/"
      },
      {
        "title": "Kosaraju's algorithm",
        "url": "https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/discuss/766485/kosaraju-algorithm-on"
      }
    ]
  },
  {
    "name": "Dynamic Programming [Patterns and Problems]",
    "questions": [
      {
        "title": "Introduction to DP",
        "url": "https://takeuforward.org/data-structure/dynamic-programming-introduction/"
      },
      {
        "title": "Climbing stairs",
        "url": "https://leetcode.com/problems/climbing-stairs/"
      },
      {
        "title": "Frog Jump",
        "url": "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-dp-3/"
      },
      {
        "title": "Frog jump with K distances",
        "url": "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-with-k-distances-dp-4/"
      },
      {
        "title": "Maximum sum of non adjacent elements",
        "url": "https://leetcode.com/problems/house-robber/"
      },
      {
        "title": "House robber",
        "url": "https://leetcode.com/problems/house-robber-ii/"
      },
      {
        "title": "Ninja's training",
        "url": "https://takeuforward.org/data-structure/dynamic-programming-ninjas-training-dp-7/"
      },
      {
        "title": "Grid Unique Paths : DP on Grids (DP8)",
        "url": "https://leetcode.com/problems/unique-paths/"
      },
      {
        "title": "Unique paths II",
        "url": "https://leetcode.com/problems/unique-paths-ii/"
      },
      {
        "title": "Minimum Falling Path Sum",
        "url": "https://leetcode.com/problems/minimum-path-sum/"
      },
      {
        "title": "Triangle",
        "url": "https://leetcode.com/problems/triangle/"
      },
      {
        "title": "Ninja and his Friends",
        "url": "https://takeuforward.org/data-structure/3-d-dp-ninja-and-his-friends-dp-13/"
      },
      {
        "title": "Subset sum equal to target (DP- 14)",
        "url": "https://takeuforward.org/data-structure/subset-sum-equal-to-target-dp-14/"
      },
      {
        "title": "Partition equal subset sum",
        "url": "https://leetcode.com/problems/partition-equal-subset-sum/"
      },
      {
        "title": "Partition a set into two subsets with minimum absolute sum difference",
        "url": "https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/"
      },
      {
        "title": "Count subsets with sum K",
        "url": "https://takeuforward.org/data-structure/count-subsets-with-sum-k-dp-17/"
      },
      {
        "title": "Count partitions with given difference",
        "url": "https://takeuforward.org/data-structure/count-partitions-with-given-difference-dp-18/"
      },
      {
        "title": "Assign Cookies",
        "url": "https://leetcode.com/problems/assign-cookies/"
      },
      {
        "title": "Minimum Coins (DP - 20)",
        "url": "https://leetcode.com/problems/coin-change/"
      },
      {
        "title": "Target sum",
        "url": "https://leetcode.com/problems/target-sum/"
      },
      {
        "title": "Coin Change 2 (DP - 22)",
        "url": "https://leetcode.com/problems/coin-change-2/"
      },
      {
        "title": "Unbounded knapsack",
        "url": "https://takeuforward.org/data-structure/unbounded-knapsack-dp-23/"
      },
      {
        "title": "Rod Cutting Problem | (DP - 24)",
        "url": "https://takeuforward.org/data-structure/rod-cutting-problem-dp-24/"
      },
      {
        "title": "Longest common subsequence",
        "url": "https://takeuforward.org/data-structure/print-longest-common-subsequence-dp-26/"
      },
      {
        "title": "Print Longest Common Subsequence | (DP - 26)",
        "url": "https://takeuforward.org/data-structure/print-longest-common-subsequence-dp-26/"
      },
      {
        "title": "Longest common substring",
        "url": "https://takeuforward.org/data-structure/longest-common-substring-dp-27/"
      },
      {
        "title": "Longest palindromic subsequence",
        "url": "https://leetcode.com/problems/longest-palindromic-subsequence/"
      },
      {
        "title": "Minimum insertions to make string palindrome | DP-29",
        "url": "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/"
      },
      {
        "title": "Minimum insertions or deletions to convert string A to B",
        "url": "https://leetcode.com/problems/delete-operation-for-two-strings/"
      },
      {
        "title": "Shortest common supersequence",
        "url": "https://leetcode.com/problems/shortest-common-supersequence/"
      },
      {
        "title": "Distinct subsequences",
        "url": "https://leetcode.com/problems/distinct-subsequences/"
      },
      {
        "title": "Edit distance",
        "url": "https://leetcode.com/problems/edit-distance/"
      },
      {
        "title": "Wildcard matching",
        "url": "https://leetcode.com/problems/wildcard-matching/"
      },
      {
        "title": "Best time to buy and sell stock",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
      },
      {
        "title": "Best time to buy and sell stock II",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/"
      },
      {
        "title": "Best time to buy and sell stock III",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/"
      },
      {
        "title": "Best time to buy and sell stock IV",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/"
      },
      {
        "title": "Best Time to Buy and Sell Stock with Cooldown",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/"
      },
      {
        "title": "Best time to buy and sell stock with transaction fees",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/"
      },
      {
        "title": "Longest Increasing Subsequence",
        "url": "https://takeuforward.org/data-structure/longest-increasing-subsequence-binary-search-dp-43/"
      },
      {
        "title": "Print Longest Increasing Subsequence",
        "url": "https://takeuforward.org/data-structure/printing-longest-increasing-subsequence-dp-42/"
      },
      {
        "title": "Longest Increasing Subsequence |(DP-43)",
        "url": "https://takeuforward.org/data-structure/longest-increasing-subsequence-binary-search-dp-43/"
      },
      {
        "title": "Largest Divisible Subset",
        "url": "https://leetcode.com/problems/largest-divisible-subset/"
      },
      {
        "title": "Longest String Chain",
        "url": "https://leetcode.com/problems/longest-string-chain/"
      },
      {
        "title": "Longest Bitonic Subsequence",
        "url": "https://takeuforward.org/data-structure/longest-bitonic-subsequence-dp-46/"
      },
      {
        "title": "Number of Longest Increasing Subsequences",
        "url": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/"
      },
      {
        "title": "Matrix chain multiplication",
        "url": "https://takeuforward.org/dynamic-programming/matrix-chain-multiplication-dp-48/"
      },
      {
        "title": "Matrix Chain Multiplication | Bottom-Up|(DP-49)",
        "url": "https://takeuforward.org/data-structure/matrix-chain-multiplication-tabulation-method-dp-49/"
      },
      {
        "title": "Minimum cost to cut the stick",
        "url": "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/"
      },
      {
        "title": "Burst balloons",
        "url": "https://leetcode.com/problems/burst-balloons/"
      },
      {
        "title": "Different Ways to Evaluate a Boolean Expression",
        "url": "https://leetcode.com/problems/parsing-a-boolean-expression/"
      },
      {
        "title": "Palindrome partitioning II ",
        "url": "https://leetcode.com/problems/palindrome-partitioning-ii/"
      },
      {
        "title": "Partition Array for Maximum Sum",
        "url": "https://leetcode.com/problems/partition-array-for-maximum-sum/"
      },
      {
        "title": "Maximum Rectangle Area with all 1's|(DP-55)",
        "url": "https://leetcode.com/problems/maximal-rectangle/"
      },
      {
        "title": "Count Square Submatrices with All Ones|(DP-56)",
        "url": "https://leetcode.com/problems/count-square-submatrices-with-all-ones/"
      }
    ]
  },
  {
    "name": "Tries",
    "questions": [
      {
        "title": "Trie Implementation and Operations",
        "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
      },
      {
        "title": "Trie Implementation and Advanced Operations",
        "url": "https://takeuforward.org/data-structure/implement-trie-ii/"
      },
      {
        "title": "Longest Word with All Prefixes",
        "url": ""
      },
      {
        "title": "Number of distinct substrings in a string",
        "url": "https://takeuforward.org/data-structure/number-of-distinct-substrings-in-a-string-using-trie/"
      },
      {
        "title": "Bit PreRequisites for TRIE Problems",
        "url": ""
      },
      {
        "title": "Maximum XOR of two numbers in an array",
        "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"
      },
      {
        "title": "Maximum Xor with an element from an array",
        "url": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/"
      }
    ]
  },
  {
    "name": "Strings",
    "questions": [
      {
        "title": "Minimum number of bracket reversals to make an expression balanced",
        "url": "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/"
      },
      {
        "title": "Count and say",
        "url": "https://leetcode.com/problems/count-and-say/"
      },
      {
        "title": "Hashing In Strings | Theory",
        "url": "https://takeuforward.org/data-structure/hashing-in-strings"
      },
      {
        "title": "Rabin Karp Algorithm",
        "url": "https://leetcode.com/problems/repeated-string-match/discuss/416144/Rabin-Karp-algorithm-C%2B%2B-implementation"
      },
      {
        "title": "Z function",
        "url": ""
      },
      {
        "title": "KMP Algorithm or LPS array",
        "url": "https://leetcode.com/problems/implement-strstr/"
      },
      {
        "title": "Shortest Palindrome",
        "url": ""
      },
      {
        "title": "Longest happy prefix",
        "url": "https://leetcode.com/problems/longest-happy-prefix/"
      },
      {
        "title": "Count Palindromic Subsequences",
        "url": "https://leetcode.com/problems/palindromic-substrings/"
      }
    ]
  }
];

async function main() {
  console.log('Deleting existing data...');
  await prisma.question.deleteMany();
  await prisma.pattern.deleteMany();

  console.log('Start seeding full A2Z Sheet...');
  for (let i = 0; i < a2zPatterns.length; i++) {
    const p = a2zPatterns[i];
    const patternName = "Step " + (i + 1) + ": " + p.name;
    const pattern = await prisma.pattern.upsert({
      where: { name: patternName },
      update: {},
      create: {
        name: patternName,
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
    console.log(`Created/Updated pattern: ${patternName} with ${p.questions.length} questions`);
  }
  console.log('A2Z Full Seeding finished.');
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
