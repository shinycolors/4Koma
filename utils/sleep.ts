function sleep(ms): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default sleep;
