const generarLCG = (semilla: number, a: number, m: number, n: number) => {
  const raws: number[] = []; const norms: number[] = []; let x = semilla;
  for (let i = 0; i < n; i++) { x = (a * x) % m; raws.push(x); norms.push(x / m); }
  return { raws, norms };
};

// 2. GENERADOR MEDIOS CUADRADOS
const generarMediosCuadrados = (semilla: number, n: number) => {
  const raws: number[] = []; const norms: number[] = []; 
  let x = semilla;

  for (let i = 0; i < n; i++) {
    const cuadrado = x * x;
    const cadenaCuadrado = String(cuadrado).padStart(8, '0');
    const centro = cadenaCuadrado.substring(2, 6);
    
    x = parseInt(centro, 10) || 0; 
    raws.push(x); 
    norms.push(x / 10000); 
  }
  return { raws, norms };
};

export {generarLCG, generarMediosCuadrados}