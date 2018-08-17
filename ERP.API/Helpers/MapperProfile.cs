using AutoMapper;
<<<<<<< HEAD
using ERP.API.DTOs.EmployeeDtos;
=======
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
using ERP.API.DTOs.ItemDtos;
using ERP.API.DTOs.OrderDtos;
using ERP.API.DTOs.SupplierDtos;
using ERP.API.Models;

namespace ERP.API.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Supplier, SupplierListDto>();

            CreateMap<ItemSupplier, ItemSupplierDto>()
                .ForMember(dest => dest.SupplierName, opt => {
                    opt.MapFrom(src => src.Supplier.Name);
            });

            CreateMap<ItemSupplier, ItemSupplierDto>()
                .ForMember(dest => dest.SupplierName, opt => {
                    opt.MapFrom(src => src.Supplier.Name);
            });

            CreateMap<ItemSupplier, ItemSupplierDto>()
                .ForMember(dest => dest.ItemName, opt => {
                    opt.MapFrom(src => src.Item.Name);
            });


            CreateMap<Order, OrderListDto>()
                .ForMember(dest => dest.SupplierName, opt => {
                    opt.MapFrom(src => src.Supplier.Name);
            });
<<<<<<< HEAD

             CreateMap<Employee, EmployeeListDto>()
                .ForMember(dest => dest.PositionName, opt => {
                    opt.MapFrom(src => src.Position.PositionName);
            });

            CreateMap<Employee, EmployeeDetailedDto>();
=======
>>>>>>> fbbcba95f7e0961ae37c9072f544b05f5b099790
        }
    }
}