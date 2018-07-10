using AutoMapper;
using ERP.API.DTOs.ItemDtos;
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
        }
    }
}