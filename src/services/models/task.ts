export class Task {
  private name: string;
  private date: string;
  private hour: string;
  private category?: string;
  private description?: string;
  private local?: string;

  constructor(name: string, date: string, hour: string) {
    this.name = name;
    this.date = date;
    this.hour = hour;
  }

  setCategory(category: string) {
    this.category = category;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setLocal(local: string) {
    this.local = local;
  }

  getName() {
    return this.name;
  }
  getDate() {
    return this.date;
  }
  getHour() {
    return this.hour;
  }

  getCategory() {
    return this.category;
  }

  getDescription() {
    return this.description;
  }

  getLocal() {
    return this.local;
  }
}
