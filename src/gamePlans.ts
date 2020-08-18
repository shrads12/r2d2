export const Plan2 = [
    ['0', 'F', 'V', '0', 'V', '0'],
    ['L', 'S', 'F', '0', '0', 'F'],
    ['0', 'F', '0', 'M', '0', '0'],
    ['0', '0', '0', 'F', '0', '0'],
    ['0', '0', '0', '0', '0', 'F'],
];

export const Plan1 = [
    ['S', 'F', 'L', 'F', 'V', 'F'],
    ['0', 'F', '0', 'F', '0', 'F'],
    ['0', 'F', '0', 'F', '0', '0'],
    ['0', 'F', '0', 'F', '0', '0'],
    ['0', '0', '0', '0', 'M', 'V'],
];


const findEmptyCell = (plan, numRows, numCols) => {
    const randRow = Math.floor(Math.random() * numRows);
    const randCol = Math.floor(Math.random() * numCols);
    if(plan[randRow][randCol] === '0') {
        return [randRow, randCol];
    }else {
        return findEmptyCell(plan, numRows, numCols);
    }
}

export const createPlan = (numF, numV, numRows, numCols) => {
    const plan = Array.from(Array(numRows)).map(() => Array(numCols).fill('0'));

    console.log('inital plan', plan);

    let [i, j ] = findEmptyCell(plan, numRows, numCols);
    plan[i][j] = 'S';

    [i, j ] = findEmptyCell(plan, numRows, numCols);
    plan[i][j] = 'L';

    [i, j ] = findEmptyCell(plan, numRows, numCols);
    plan[i][j] = 'M';

    Array.from(Array(numF)).forEach(() => {
        const [i, j] = findEmptyCell(plan, numRows, numCols);
        plan[i][j] = 'F';
    });
    Array.from(Array(numV)).forEach(() => {
        const [i, j] = findEmptyCell(plan, numRows, numCols);
        plan[i][j] = 'V';
    });

    return plan;
}

export const changePlan = (currentPlan, currentPosition) => {
    const numRows = currentPlan.length, numCols = currentPlan[0].length;
    let plan = Array.from(Array(numRows)).map(() => Array(numCols).fill('0'));

    let numF = 0, numV = 0, numL = 0;
    currentPlan.forEach((row, i) => {
        row.forEach((col, j) => {
            switch(col) {
                case 'F':
                    numF++;
                    break;
                case 'V':
                    numV++;
                    break;
                case 'L':
                    numL++;
                    break;
            }
        })
    })

    let [i, j ] = currentPosition;
    plan[i][j] = 'S';

    if(numL) {
        [i, j ] = findEmptyCell(plan, numRows, numCols);
        plan[i][j] = 'L';
    }

    [i, j ] = findEmptyCell(plan, numRows, numCols);
    plan[i][j] = 'M';

    Array.from(Array(numF)).forEach(() => {
        const [i, j] = findEmptyCell(plan, numRows, numCols);
        plan[i][j] = 'F';
    });
    Array.from(Array(numV)).forEach(() => {
        const [i, j] = findEmptyCell(plan, numRows, numCols);
        plan[i][j] = 'V';
    });

    return plan;
}

export const Objects = {
    'L': 'lightsaber',
    'V': 'darthvader',
    'M': 'medal'
}