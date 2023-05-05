export function solve(target: number, nums: number[]) {
  for (const num of nums) {
    if (num === target) {
      return ["Target is already in numbers :)"];
    }
  }

  const currentSequence: string[] = [];
  const numsCopy = [...nums];
  solveHelper(target, numsCopy, currentSequence);
  return currentSequence;
}

function solveHelper(target: number, nums: number[], currentSequence: string[]) {
  for (const num of nums) {
    if (num === target) {
      return true;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    const firstNum = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      const secondNum = nums[j];

      // remove two nums from array
      nums.splice(j, 1);
      nums.splice(i, 1);

      // addition
      const sum = firstNum + secondNum;
      nums.push(sum);
      currentSequence.push(firstNum + " + " + secondNum);
      if (solveHelper(target, nums, currentSequence)) {
        return true;
      }
      nums.pop();
      currentSequence.pop();

      // subtraction
      const difference1 = firstNum - secondNum;
      if (difference1 >= 0) {
        nums.push(difference1);
        currentSequence.push(firstNum + " - " + secondNum);
        if (solveHelper(target, nums, currentSequence)) {
          return true;
        }
        nums.pop();
        currentSequence.pop();
      }

      const difference2 = secondNum - firstNum;
      if (difference2 >= 0) {
        nums.push(difference2);
        currentSequence.push(secondNum + " - " + firstNum);
        if (solveHelper(target, nums, currentSequence)) {
          return true;
        }
        nums.pop();
        currentSequence.pop();
      }

      // multiplication
      const multiplied = firstNum * secondNum;
      nums.push(multiplied);
      currentSequence.push(firstNum + " * " + secondNum);
      if (solveHelper(target, nums, currentSequence)) {
        return true;
      }
      nums.pop();
      currentSequence.pop();

      // division
      if (secondNum !== 0) {
        const divided1 = firstNum / secondNum;
        if (Number.isInteger(divided1)) {
          nums.push(divided1);
          currentSequence.push(firstNum + " / " + secondNum);
          if (solveHelper(target, nums, currentSequence)) {
            return true;
          }
          nums.pop();
          currentSequence.pop();
        }
      }

      if (firstNum !== 0) {
        const divided2 = secondNum / firstNum;
        if (Number.isInteger(divided2)) {
          nums.push(divided2);
          currentSequence.push(secondNum + " / " + firstNum);
          if (solveHelper(target, nums, currentSequence)) {
            return true;
          }
          nums.pop();
          currentSequence.pop();
        }
      }

      // add back two nums to array
      nums.splice(i, 0, firstNum);
      nums.splice(j, 0, secondNum);
    }
  }
  return false;
}
