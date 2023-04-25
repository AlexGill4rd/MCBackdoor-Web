import IItemstack from "./IItemstack";

export default interface ISlot {
  value: number;
  itemstack?: IItemstack;
  empty: boolean;
}
