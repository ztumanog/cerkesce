export class DataChunkLoader {
  constructor(private repository: any) {}

  async loadChunked(data: any, chunkSize = 5000, onProgress?: (progress: any) => void) {
    const { entries, groups = [] } = data;
    const total = entries.length;

    if (typeof (this.repository as any).clear === "function") {
      await (this.repository as any).clear();
    }

    if (groups.length > 0 && typeof this.repository.loadGroups === "function") {
      await this.repository.loadGroups(groups);
    }

    for (let i = 0; i < total; i += chunkSize) {
      const chunk = entries.slice(i, i + chunkSize);
      await this.repository.loadEntries(chunk as any);

      if (onProgress) {
        const memoryMB = typeof process !== 'undefined' && process.memoryUsage 
          ? process.memoryUsage().heapUsed / 1024 / 1024 
          : 0;

        onProgress({
          processedEntries: Math.min(i + chunkSize, total),
          totalEntries: total,
          percentage: Math.round((Math.min(i + chunkSize, total) / total) * 100),
          memoryUsageMB: Math.round(memoryMB * 100) / 100,
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
}
