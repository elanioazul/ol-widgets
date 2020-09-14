<?xml version="1.0" encoding="UTF-8" standalone='no'?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:se="http://www.opengis.net/se" version="1.1.0" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd">
  <NamedLayer>
    <se:Name>ge.geomorf_cyl_ad_di_p</se:Name>
    <UserStyle>
      <se:Name>ge.geomorf_cyl_ad_di_p</se:Name>
      <se:FeatureTypeStyle>
        <se:Rule>
          <se:Name>Single symbol</se:Name>
          <se:PointSymbolizer>
            <se:Graphic>
              <!--Plain SVG fallback, no parameters-->
              <se:ExternalGraphic>
                <se:InlineContent encoding="base64">
                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAjBJREFUOI2tVM1rE0EcfbO7JmmTqFGosaGIWFCD1V6UKtKYu4KXHgQR0VIKRfHkNb2IePRPkCIovYr0VleCURTqwYZQvLRabaz57u7OfsyMF5Muu5ukgu80+97vvXnD7g5BH4gcpJ8fL46QfSGSDA19I4uLrNc86SZ8v37+sOSE5wFxi4DsBwDO+Y4kkQXhkNzwUn57z4HlaxOjtiPnZZkcCdKZ4NuEiMnUq0Kpb+CXqXToQCuxpijkWLf2AMCZ2LR0ZfS4qlI3L3kHEzuJGXdYnVrYqDfoRqNuNExz1yiTlDxozXn9vkBLsNn2ukp1Z0vTbqwfPRVbT56Ol1vazRo1nE5LjhmvX/HtQMhIe61Z7HG2sPoCWG1Tzz9lxs8mInj4t06qb0PGeYeLEfm1V4/KoSVXQ9878AVSzsudwIHwlFcfiMgdzrLZb6/uO3LTtBcOhsLzhACSLD/4cfXyJlfMZxINS0QSd5iEWQAQAFomfen1+yovZ9KxIWlw61A0EvVqblR1ajZ0ffjS+2LVzfuOnFWLO3XLynEhuoYxIdC06SNvWGAgAFhK4mnFoIG/FgBUNL0ar/AnQVpgYFZVnYph37c592k256hR596ZYtEK8na9HABgJTP+NRmPnXBzv1ra2jl15WQ3T2DDNlqM3jWd3duKOgw127jdy9MzcDJfUiu68aH9XKXG8pV3pUIvj+879KJp02nSFJ9BwHXGp/vN7wlvJsbG3l5Ip/9L2L/iD7nz6HjqwCwaAAAAAElFTkSuQmCC
                </se:InlineContent>
              </se:ExternalGraphic>
              <!--Well known marker fallback-->
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:MinScaleDenominator>200</se:MinScaleDenominator>
          <se:MaxScaleDenominator>60000</se:MaxScaleDenominator>
          <se:TextSymbolizer>
            <se:Label>
              <ogc:PropertyName>asaTIPO</ogc:PropertyName>
            </se:Label>
            <se:Font>
              <se:SvgParameter name="font-family">Lucida Console</se:SvgParameter>
              <se:SvgParameter name="font-size">14</se:SvgParameter>
            </se:Font>
            <se:LabelPlacement>
              <se:PointPlacement>
                <se:AnchorPoint>
                  <se:AnchorPointX>0</se:AnchorPointX>
                  <se:AnchorPointY>0.5</se:AnchorPointY>
                </se:AnchorPoint>
                <Displacement>
                  <DisplacementX>15</DisplacementX>
                  <DisplacementY>12</DisplacementY>
                </Displacement>
              </se:PointPlacement>
            </se:LabelPlacement>
            <se:Fill>
              <se:SvgParameter name="fill">#000000</se:SvgParameter>
              <se:SvgParameter name="fill-opacity">0.1</se:SvgParameter>
            </se:Fill>
            <se:VendorOption name="maxDisplacement">1</se:VendorOption>
          </se:TextSymbolizer>
        </se:Rule>
      </se:FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
