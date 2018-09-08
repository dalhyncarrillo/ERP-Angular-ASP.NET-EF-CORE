using AutoMapper;
using ERP.API.DTOs.EmployeeDtos;
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

             CreateMap<Employee, EmployeeListDto>()
                .ForMember(dest => dest.PositionName, opt => {
                    opt.MapFrom(src => src.Position.PositionName);
            });

            CreateMap<EmployeeRole, EmployeeRoleDto>()
                .ForMember(dest => dest.RoleNameEn, opt => {
                    opt.MapFrom(src => src.Role.RoleNameEn);})
                .ForMember(dest => dest.RoleNameHu, opt => {
                    opt.MapFrom(src => src.Role.RoleNameHu);
            });
            
    
            CreateMap<Employee, EmployeeDetailedDto>();
        }
    }
}