export const mothersDayEmailHeader = {
  id: "nectar_email_header_mothers_day_v1",
  name: "Email Header - Mother's Day Collection",
  category: "email_header",
  
  dimensions: {
    width: 1080,
    height: 400
  },
  
  textZones: [
    {
      id: "headline",
      x: 50, y: 80, width: 500, height: 60,
      fontFamily: "Gelica", fontSize: 48, color: "#F05380",
      textAlign: "left", maxLines: 2
    }
  ],
  
  imageZones: [
    {
      id: "hero_product",
      x: 600, y: 50, width: 400, height: 300,
      cropStyle: "center", backgroundRemoval: true,
      productCategories: ["body_butter", "gift_sets"]
    }
  ],
  
  colorZones: [
    {
      id: "background",
      type: "solid", x: 0, y: 0, width: 1080, height: 400,
      color: "#FCF4EE", opacity: 1.0
    }
  ],
  
  triggers: {
    campaignType: ["mothers_day", "gifting", "premium"],
    products: ["body_butter", "gift_sets"],
    tone: ["warm", "premium"],
    discount: false
  }
};