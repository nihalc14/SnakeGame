import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const GRID_SIZE = 20;
const CELL_SIZE = Dimensions.get('window').width / GRID_SIZE;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const GAME_SPEED = 200;

interface Position {
  x: number;
  y: number;
}

export default function App() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout>();

  const generateFood = (currentSnake: Position[]) => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  };

  useEffect(() => {
    if (gameOver) return;

    gameLoopRef.current = setInterval(() => {
      setSnake(prevSnake => {
        setDirection(nextDirection);
        const head = prevSnake[0];
        const newHead = {
          x: (head.x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + nextDirection.y + GRID_SIZE) % GRID_SIZE,
        };

        // Check collision with self
        if (prevSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];

        // Check if food eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 1);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoopRef.current);
  }, [gameOver, nextDirection, food]);

  const handleDirection = (dx: number, dy: number) => {
    if (direction.x === -dx && direction.y === -dy) return;
    setNextDirection({ x: dx, y: dy });
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snake Game</Text>
      <Text style={styles.score}>Score: {score}</Text>

      <View style={styles.gameBoard}>
        {/* Food */}
        <View
          style={[
            styles.cell,
            styles.food,
            { left: food.x * CELL_SIZE, top: food.y * CELL_SIZE },
          ]}
        />

        {/* Snake */}
        {snake.map((segment, idx) => (
          <View
            key={idx}
            style={[
              styles.cell,
              styles.snake,
              idx === 0 && styles.head,
              { left: segment.x * CELL_SIZE, top: segment.y * CELL_SIZE },
            ]}
          />
        ))}
      </View>

      {gameOver && (
        <Text style={styles.gameOverText}>Game Over! Final Score: {score}</Text>
      )}

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.btnUp}
          onPress={() => handleDirection(0, -1)}
        >
          <Text style={styles.btnText}>↑</Text>
        </TouchableOpacity>

        <View style={styles.middleRow}>
          <TouchableOpacity
            style={styles.btnSide}
            onPress={() => handleDirection(-1, 0)}
          >
            <Text style={styles.btnText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnDown}
            onPress={() => handleDirection(0, 1)}
          >
            <Text style={styles.btnText}>↓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSide}
            onPress={() => handleDirection(1, 0)}
          >
            <Text style={styles.btnText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.resetBtn} onPress={resetGame}>
        <Text style={styles.resetBtnText}>
          {gameOver ? 'Play Again' : 'Reset'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    color: '#4ade80',
    marginBottom: 20,
  },
  gameBoard: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').width - 20,
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#4ade80',
    marginBottom: 20,
    position: 'relative',
  },
  cell: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  snake: {
    backgroundColor: '#4ade80',
  },
  head: {
    backgroundColor: '#22c55e',
  },
  food: {
    backgroundColor: '#ef4444',
    borderRadius: CELL_SIZE / 2,
  },
  controls: {
    marginBottom: 20,
  },
  btnUp: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  btnSide: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDown: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  resetBtn: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameOverText: {
    fontSize: 20,
    color: '#ef4444',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
