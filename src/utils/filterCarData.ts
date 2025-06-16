export const filterCarData = (data: any, filter: any) => {
    return data.filter((d: any) => {
      if(
        (filter.brand.length === 0 || d.brand?.toLowerCase() === filter.brand?.toLowerCase()) &&
        (filter.variant.length === 0 || d.variant?.toLowerCase() === filter.variant?.toLowerCase()) &&
        (filter.cost_from.length === 0 || parseInt(d.cost) >= parseInt(filter.cost_from)) &&
        (filter.cost_to.length === 0 || parseInt(d.cost) <= parseInt(filter.cost_to)) &&
        (filter.safetyRating.length === 0 || parseInt(d.safetyRating) == parseInt(filter.safetyRating))
      ){
        return true;
      }
      return false;
    });
}