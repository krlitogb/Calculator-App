import { useRef, useState } from 'react';

enum Operator {
 add,
 subtract,
 multiply,
 divide,
}

export const useCalculator = () => {

 const [ number, setNumber ] = useState( '0' );
 const [ prevNumber, setPrevNumber ] = useState( '0' );

 const lastOperation = useRef<Operator>();

 const clean = () => {

  setNumber( '0' );
  setPrevNumber( '0' );

 };


 const deleteOperation = () => {

  let currentSing = '';
  let temporalNumber = number;

  if ( number.includes( '-' ) ) {
   currentSing = '-';
   temporalNumber = number.substring( 1 );
  }

  if ( temporalNumber.length > 1 ) {
   return setNumber( currentSing + temporalNumber.slice( 0, -1 ) );
  }
  setNumber( '0' );

 };

 const toggleSign = () => {
  if ( number.includes( '-' ) ) {
   return setNumber( number.replace( '-', '' ) );
  }

  setNumber( '-' + number );
 };

 const buildNumber = ( numberString: string ) => {

  if ( number.includes( '.' ) && numberString === '.' ) return;

  if ( number.startsWith( '0' ) || number.startsWith( '-0' ) ) {

   //Punto decimal
   if ( numberString === '.' ) {
    return setNumber( number + numberString );
   }

   // Evaluar si es otro cero y no hay punto
   if ( numberString === '0' && number.includes( '.' ) ) {
    return setNumber( number + numberString );
   }

   // Evaluar si es diferente de cero, no hay punto y es el primer numero
   if ( numberString !== '0' && !number.includes( '.' ) ) {
    return setNumber( numberString );
   }


   // Evitar 000000000
   if ( numberString === '0' && !number.includes( '.' ) ) {
    return;
   }

   return setNumber( number + numberString );
  }


  setNumber( number + numberString );
 };

 const setLasNumber = () => {
  if ( number.endsWith( '.' ) ) {
   setPrevNumber( number.slice( 0, -1 ) );
  } else {
   setPrevNumber( number );
  }

  setNumber( '0' );
 };

 const divideOperation = () => {
  setLasNumber();
  lastOperation.current = Operator.divide;
 };

 const multiplyOperation = () => {
  setLasNumber();
  lastOperation.current = Operator.multiply;
 };

 const subtractOperation = () => {
  setLasNumber();
  lastOperation.current = Operator.subtract;
 };

 const addOperation = () => {
  setLasNumber();
  lastOperation.current = Operator.add;
 };


 const calculateResult = () => {

  const num1 = Number( number );
  const num2 = Number( prevNumber );

  switch ( lastOperation.current ) {

   case Operator.add:
    setNumber( `${ num1 + num2 }` );
    break;
 
   case Operator.subtract:
    setNumber( `${ num2 - num1 }` );
    break;
 
   case Operator.multiply:
    setNumber( `${ num1 * num2 }` );
    break;
 
   case Operator.divide:
    setNumber( `${ num2 / num1 }` );
    break;
 

   default:
    throw new Error( 'Operación no implementada' );
  }

  setPrevNumber('0');
 };

 return {
  //Properties
  number,
  prevNumber,





  //Methods
  buildNumber,
  toggleSign,
  clean,
  deleteOperation,
  divideOperation,
  multiplyOperation,
  subtractOperation,
  addOperation,
  calculateResult,

 };
};
