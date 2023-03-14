import kmodel from "./model.js"; // importa o modelo Keras-js

async function suggestMove(boardState) {
  // cria um tensor do estado do tabuleiro (transformando-o em um array de 1 dimensão)
  const input = tf.tensor(boardState.flat());

  // faz a predição da jogada sugerida pela IA
  const output = await kmodel.predict({ input });

  // extrai a jogada sugerida a partir do tensor de saída
  const suggestedMove = Array.from(output.output).indexOf(
    Math.max(...output.output)
  );

  return suggestedMove;
}
