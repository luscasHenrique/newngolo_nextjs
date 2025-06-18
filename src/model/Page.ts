export default class Page<R, T> {
  constructor(
    public page: number,
    public pageSize: number,
    public entity?: R,
    public total?: number,
    public list?: T[],
    public sort?: string,
    public order?: 'ASC' | 'DESC'
  ) {}
}
