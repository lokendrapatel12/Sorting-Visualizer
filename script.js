let array = [];

function generateArray() {
  const arraySize = document.getElementById('arraySize').value;
  array = [];

  for (let i = 0; i < arraySize; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }

  displayArray();
}

function displayArray() {
  const arrayContainer = document.getElementById('array-container');
  arrayContainer.innerHTML = '';

  array.forEach((value, idx) => {
    const bar = document.createElement('div');
    bar.classList.add('array-bar');
    bar.style.height = `${value * 3}px`;
    bar.style.width = `${100 / array.length}%`;
    bar.style.backgroundColor = 'steelblue';
    arrayContainer.appendChild(bar);
  });
}

async function sortArray() {
  const algorithm = document.getElementById('algorithm').value;
  switch (algorithm) {
    case 'bubble':
      await bubbleSort();
      break;
    case 'selection':
      await selectionSort();
      break;
    case 'insertion':
      await insertionSort();
      break;
    case 'quick':
      await quickSort(0, array.length - 1);
      break;
  }
}

async function bubbleSort() {
  const bars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'yellow';
      bars[j + 1].style.backgroundColor = 'yellow';

      if (array[j] > array[j + 1]) {
        await swap(j, j + 1);
      }

      bars[j].style.backgroundColor = 'steelblue';
      bars[j + 1].style.backgroundColor = 'steelblue';
    }

    bars[array.length - i - 1].style.backgroundColor = 'green';
  }

  bars[0].style.backgroundColor = 'green';
}

async function selectionSort() {
  const bars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    bars[minIdx].style.backgroundColor = 'red';

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = 'yellow';

      if (array[j] < array[minIdx]) {
        bars[minIdx].style.backgroundColor = 'steelblue';
        minIdx = j;
        bars[minIdx].style.backgroundColor = 'red';
      }

      await sleep(100);
      bars[j].style.backgroundColor = 'steelblue';
    }

    await swap(i, minIdx);
    bars[minIdx].style.backgroundColor = 'steelblue';
    bars[i].style.backgroundColor = 'green';
  }
}

async function insertionSort() {
  const bars = document.getElementsByClassName('array-bar');

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].style.backgroundColor = 'red';

    while (j >= 0 && array[j] > key) {
      bars[j].style.backgroundColor = 'yellow';
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j] * 3}px`;

      await sleep(100);

      bars[j].style.backgroundColor = 'steelblue';
      j--;
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key * 3}px`;
    bars[i].style.backgroundColor = 'steelblue';
  }

  for (let i = 0; i < array.length; i++) {
    bars[i].style.backgroundColor = 'green';
  }
}

async function quickSort(low, high) {
  if (low < high) {
    const pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  const bars = document.getElementsByClassName('array-bar');
  let pivot = array[high];
  bars[high].style.backgroundColor = 'red';

  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = 'yellow';

    if (array[j] < pivot) {
      i++;
      await swap(i, j);
    }

    bars[j].style.backgroundColor = 'steelblue';
  }

  await swap(i + 1, high);
  bars[high].style.backgroundColor = 'steelblue';
  bars[i + 1].style.backgroundColor = 'green';

  return i + 1;
}

async function swap(i, j) {
  const bars = document.getElementsByClassName('array-bar');

  [array[i], array[j]] = [array[j], array[i]];

  bars[i].style.height = `${array[i] * 3}px`;
  bars[j].style.height = `${array[j] * 3}px`;

  await sleep(100);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
