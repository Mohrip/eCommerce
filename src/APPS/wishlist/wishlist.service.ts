import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../Product/Product.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async addToWishlist(userId: number, productId: number): Promise<Wishlist> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productsService.findProductById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const wishlistItem = this.wishlistRepository.create({ user, product });
    return this.wishlistRepository.save(wishlistItem);
  }

  async removeFromWishlist(userId: number, productId: number): Promise<void> {
    const wishlistItem = await this.wishlistRepository.findOne({ where: { user: { id: userId }, product: { id: productId } } });
    if (!wishlistItem) {
      throw new NotFoundException('Wishlist item not found');
    }

    await this.wishlistRepository.remove(wishlistItem);
  }

  async viewWishlist(userId: number): Promise<Wishlist[]> {
    return this.wishlistRepository.find({ where: { user: { id: userId } }, relations: ['product'] });
  }


  // from this line is used to testing only  
  async findWithUserAndProducts(userId: number, productId: number): Promise<Wishlist> {
    return this.wishlistRepository.findOne({ where: { user: { id: userId }, product: { id: productId } } });
  }

  async findWishlistItem(userId: number, productId: number): Promise<Wishlist>{
    return this.wishlistRepository.findOne({ where: { user: { id: userId}, product: { id: productId}}})
  }

  async findAllWishlistItems(userId: number, productId: number ): Promise<Wishlist[]> {
    const can = this.wishlistRepository.find({ where: { user: { id: userId }, product: { id: productId } } });
    const can2 = await can;
    const can3 = await Promise.all(can2.map(async (item) => {
      await this.wishlistRepository.remove(item);
      return item;
    }));
    return can3
  }

 
  

  async findWishlistItemByProductId(productId: number): Promise<Wishlist[]> {
    return this.wishlistRepository.find({ where: { product: { id: productId}}})
  }

  async findWishlistItemByUserId(userId: number): Promise<Wishlist[]> {
    return this.wishlistRepository.find({ where: { user: { id: userId}}})
  }





  // end of testing


}