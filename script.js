import { Block } from './src/block.js';

const main = () => {
  const canvas = document.getElementById('mainCanvas');

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    let colorIndex = 0;
    let colorList = ['magenta', 'teal', 'white', 'red', 'blue', 'aqua'];

    let blocks = [];
    const NUM_BLOCKS = 64;
    const BLOCK_SIZE = 4;

    const cycleColor = () => {
      colorIndex + 1 >= colorList.length ? (colorIndex = 0) : colorIndex++;
    };

    const generateBlocks = ({ 
      numBlocks, 
      blockSize,
      maxSpeed = 10 
    }) => {
      let generatedBlocks = [];
      for (let i = 0; i < numBlocks; i++) {
        const block = new Block(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          blockSize
        );

        block.speed = Math.random() * maxSpeed;
        block.dx = (-1.0 + Math.random() * 2.0) * block.speed;
        block.dy = (-1.0 + Math.random() * 2.0) * block.speed;
        block.fillStyle = colorList[colorIndex];
        cycleColor();

        generatedBlocks.push(block);
      }

      return generatedBlocks;
    };

    const updateBlock = (block) => {
      const processCollision = (block) => {
        if (
          block.x + block.dx < 0 ||
          block.x + block.dx > canvas.width - block.size
        ) {
          block.dx = -block.dx;
          cycleColor();
          block.fillStyle = colorList[colorIndex];
        }

        if (
          block.y + block.dy < 0 ||
          block.y + block.dy > canvas.height - block.size
        ) {
          block.dy = -block.dy;
          cycleColor();
          block.fillStyle = colorList[colorIndex];
        }
      };

      processCollision(block);

      // Update the position by the newly calculated dx / dy
      block.x += block.dx;
      block.y += block.dy;
    };

    const renderBlock = (block) => {
      const drawCircleTile = (block) => {
        ctx.beginPath();
        ctx.arc(
          block.x + block.size / 2,
          block.y + block.size / 2,
          block.size / 2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = block.fillStyle;
        ctx.fill();
        ctx.closePath();
      };

      const drawSquareTile = (block) => {
        ctx.fillStyle = block.fillStyle;
        ctx.fillRect(block.x, block.y, block.size, block.size);
      };

      drawSquareTile(block);
      //drawCircleTile(block);
    };

    const initialize = () => {
      blocks = generateBlocks({
        numBlocks: NUM_BLOCKS, 
        blockSize: BLOCK_SIZE,
        maxSpeed: 2
      });
    };

    const mainLoop = () => {
      // Clear screen
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and render each block
      for (let block of blocks) {
        updateBlock(block);
        renderBlock(block);
      }

      // Catch a ride to do it all over again
      requestAnimationFrame(mainLoop);
    };

    initialize();
    mainLoop();
  }
};

window.addEventListener('load', main);
